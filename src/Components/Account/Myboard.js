import React, { Component } from "react";
import axios from "axios";
import Grid from 'react-grid-layout';
import Masonry from "react-masonry-component";
import { connect } from "react-redux";
import Header from "../header/Header";
import "../styles/Myboard.css";
import MdClear from "react-icons/lib/md/clear";
import {Link} from 'react-router-dom';
import {login} from '../../ducks/reducer';

class Myboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      account: [],
      name: "",
      email: "",
      grid: false,
      // id: null,
      // url: '',
      // text: '',
    };
    this.showAccountInfo = this.showAccountInfo.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.handleGrid = this.handleGrid.bind(this);
    this.backToMason = this.backToMason.bind(this);
  }
  componentDidMount(props) {
    axios.get('/user-data').then(response => {
      const user = response.data
      this.props.login(response.data)
      axios.get(`/myimages/${user.id}`).then(response => {
        const image = response.data;
        console.log(image);
        this.setState({
          contents: image
        });
      });
    }).catch(() => {
      this.props.history.push('/')
    });
  }

  showAccountInfo(props) {
    const { id } = this.props.user;
    axios.get(`/mydreams/${id}`).then(response => {
      this.setState({
        account: response.data
      });
    });
  }

  deleteImage(id){
    axios.delete(`/deletedream/${id}/${this.props.user.id}`).then(response => {
      this.setState({
        contents: response.data
      })
    })
  }

  handleGrid() {
    this.setState({
      grid: true
    });
  }

  backToMason() {
    this.setState({
      grid: false
    });
  }

  render() {
    const { contents } = this.state;
    const { account } = this.state;
    return (
      <div className='component'>
        <Header />
        <div className='board-background'>
          <div className='buttons'>
              <button className='myboard-btn' onClick={this.handleGrid}>
              Click Here for Drag and Drop
              </button>
            
              <button className='myboard-btn' onClick={this.backToMason}>Reset</button>
          </div>
        </div>
        <div id="tile-background">
        {this.state.grid ? (
                <Grid>
                {contents.map((elem, i) => {
                  // {console.log('element', elem)}
                  return (
                    <div key={i} className='tiles'>
                      <img
                        onClick={this.imageClick}
                        src={elem.image_url}
                        alt="display"
                        className="image"
                      />
                      <h2 className="image-texts">
                        <span>{elem.image_text}</span>
                      </h2>
                      </div>
                  );
                })}
              </Grid>
              ) : (
          <Masonry>
          {contents.map((elem, i) => {
            return (
              <div key={i} className='tiles'>
                <img
                  onClick={this.imageClick}
                  src={elem.image_url}
                  alt="display"
                  className="image"
                />
                <button className='delete-btn' onClick={() => {this.deleteImage(elem.id)}}>DELETE</button>
                  <Link to={`/alterdream/${elem.id}`}><button className='edit-btn'>EDIT</button></Link>
                <h2 className="image-texts">
                  <span>{elem.image_text}</span>
                </h2>
              </div>
            );
          })}
        </Masonry>
        )}
        </div>
        <div className='account-info'>
        <button className='myboard-btn' onClick={this.showAccountInfo}>Show Account Info</button>
        {account[0] ? (
          <div className="account-info">
            <h4>{account[0].name}</h4>
            <h5>{account[0].email}</h5>
            {account.map((elem, i) => {
              return (
                <div key={i} className='account-info-detail'>
                  <h6><b>Image:</b> {elem.image_url} <b>/ Text:</b> {elem.image_text} <b>/ Category</b>{elem.category_name}</h6>
                  
                </div>
              );
            })}
          </div>
        ) : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, {login})(Myboard);
