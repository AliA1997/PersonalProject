import React, { Component } from "react";
import axios from "axios";
import Masonry from "react-masonry-component";
import { connect } from "react-redux";
import Header from "../Header/Header";
import "./Myboard.css";
import MdClear from "react-icons/lib/md/clear";

class Myboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      account: [],
      name: "",
      email: ""
    };
    this.showAccountInfo = this.showAccountInfo.bind(this);
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

  showAccountInfo() {
    const { id } = this.props.user;
    axios.get(`/mydreams/${id}`).then(response => {
      this.setState({
        account: response.data
      });
    });
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
                  />
                  <button>
                    <MdClear />
                  </button>
                  <h2 className="image-texts">
                    <span>{elem.image_text}</span>
                  </h2>
                </div>
              );
            })}
          </Masonry>
        </div>
        <button onClick={this.showAccountInfo}>Show Account Info</button>
        {this.state.account[0] ? (
          <div className="account-info">
            <h4>{this.state.account[0].name}</h4>
            <h5>{this.state.account[0].email}</h5>
            {this.state.account.map((elem, i) => {
              return (
                <div key={i}>
                  <h6>{elem.image_url}</h6>
                  <h6>{elem.image_text}</h6>
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
