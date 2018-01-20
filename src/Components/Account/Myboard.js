import React, { Component } from "react";
import axios from "axios";
import Grid from 'react-grid-layout';
import Masonry from "react-masonry-component";
import { connect } from "react-redux";
import Header from "../header/Header";
import "./Myboard.css";
import MdClear from "react-icons/lib/md/clear";

class Myboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      account: [],
      name: "",
      email: "",
      grid: false,
    };
    this.showAccountInfo = this.showAccountInfo.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.handleGrid = this.handleGrid.bind(this);
    this.backToMason = this.backToMason.bind(this);
  }
      componentDidMount(props) {
    console.log("props", this.props);
    const { id } = this.props.user;
    axios.get(`/myimages/${id}`).then(response => {
      const image = response.data;
      console.log(image);
      this.setState({
        contents: image
      });
    });
  }

  showAccountInfo(props) {
    console.log(this.props, 'propS')
    const { id } = this.props.user;
    axios.get(`/mydreams/${id}`).then(response => {
      this.setState({
        account: response.data
      });
    });
  }

  deleteImage(id){
    console.log(id);
    axios.delete(`/deletedream/${id}/${this.props.user.id}`).then(response => {
      console.log(response.data);
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
        <button className='home-btn' onClick={this.handleGrid}>
              Click Here for Drag and Drop
            </button>
            <button className='home-btn' onClick={this.backToMason}>Reset</button>
        <div className="tile-boxes">
        {this.state.grid ? (
                <Grid>
                {contents.map((elem, i) => {
                  // {console.log('element', elem)}
                  return (
                    <div key={i} className="image-container">
                      <img
                        onClick={this.imageClick}
                        src={elem.image_url}
                        alt="display"
                        className="image"
                      />
                      <h2 className="image-texts">
                      <button className='delete-btn' onClick={() => {this.deleteImage(elem.id)}}>Delete
                  {/* <span><MdClear /></span> */}
                  </button>
                        <span>{elem.image_text}</span>
                        {/* <div className='delete-btn'>
                        <button onClick={() => {this.deleteImage(elem.id)}}>Delete
                        </button>
                        </div> */}
                      </h2>
                    </div>
                  );
                })}
              </Grid>
        ) : (
          <Masonry>
          {contents.map((elem, i) => {
            // {console.log('element', elem)}
            return (
              <div key={i} className="image-container">
                <img
                  onClick={this.imageClick}
                  src={elem.image_url}
                  alt="display"
                  className="image"
                />
                <div>
                <h2 className="image-texts">
                <button className='delete-btn' onClick={() => {this.deleteImage(elem.id)}}>Delete
                  {/* <span><MdClear /></span> */}
                  </button>
                  <span>{elem.image_text}</span>
                </h2>
                </div>
              </div>
            );
          })}
        </Masonry>
        )}
        </div>
        <button className='home-btn' onClick={this.showAccountInfo}>Show Account Info</button>
        {account[0] ? (
          <div className="account-info">
            <h4>{account[0].name}</h4>
            <h5>{account[0].email}</h5>
            {account.map((elem, i) => {
              return (
                <div key={i}>
                  <h6><b>Image:</b> {elem.image_url} <b>/ Text:</b> {elem.image_text}</h6>
                  
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Myboard);
