import React, { Component } from "react";
import axios from "axios";
import Masonry from "react-masonry-component";
import { connect } from "react-redux";
import Header from "../Header/Header";
import "./Myboard.css";

class Myboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      account: [],
    };
    this.showAccountInfo = this.showAccountInfo.bind(this)
  }
  componentDidMount(props) {
    console.log("props", this.props);
    const { id } = this.props.user;
    axios.get(`/myimages/${id}`).then(response => {
      // console.log(response, 'hello')
      const image = response.data;
      //   const text = image.map(elem => {
      //     return elem.image_text
      //   })
      //   const images = image.map(elem =>{
      //     return elem.image_url
      //   })
      console.log(image);
      this.setState({
        contents: image
      });
    });
    axios.get(`/mydreams/${id}`).then(response => {
      this.setState({
        account: response.data
      })
      const accountInfo = <h4>{this.state.account[0].name}</h4>
      console.log(this.state.account)
    })
  }

  showAccountInfo(){
    <div>
    <h4>{this.state.account[0].name}</h4>
    <h5>{this.state.account[0].email}</h5></div> 
      {this.state.account.map((elem, i) => {
        return (
          <div key={i}>
          <h6>{elem.image_url}</h6>
          <h6>{elem.image_text}</h6>
          </div>
        )
      })}
  }

  render() {
    const { contents } = this.state;
    const { account } = this.state;
    return (
      <div>
        <Header />
        <div className="tile-box">
          <Masonry>
            {contents.map((elem, i) => {
              // {console.log('element', elem)}
              return (
                <div key={i} className="tiles">
                  <img
                    onClick={this.imageClick}
                    src={elem.image_url}
                    alt="display"
                    className="image"
                    data-grid={{ x: 4, y: 0, w: 1, h: 2 }}
                  />
                  <h2 className="image-texts">
                    <span>{elem.image_text}</span>
                  </h2>
                </div>
              );
            })}
          </Masonry>
          <div className='account-info'>
                {this.state.account[0] ? 
                <button onClick={this.showAccountInfo}>Show Account Info</button>: null}
                  </div>
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

export default connect(mapStateToProps)(Myboard);
