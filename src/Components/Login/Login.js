import React, { Component } from "react";
// import {Link} from 'react-router-dom';
import logo from "./../../logo.svg";
import "./Login.css";
import { login } from "../../Ducks/Reducer";
import { connect } from "react-redux";
import Auth0Lock from "auth0-lock";
import axios from "axios";

let options = {
  theme: {
    logo: logo,
    primaryColor: "#13F9E4",
    backgroundColor: "black"
  },
  languageDictionary: {
    title: "Dream Login"
  }
};

class Login extends Component {
  constructor() {
    super();
    this.lock = null;
    this.login = this.login.bind(this);
  }

  //Creating Auth0 Functionality within Login Component
  componentDidMount() {
    this.lock = new Auth0Lock(
      process.env.REACT_APP_AUTH0_CLIENT_ID,
      process.env.REACT_APP_AUTH0_DOMAIN,
      options
    );
    this.lock.on("authenticated", authResult => {
      this.lock.getUserInfo(authResult.accessToken, (error, user) => {
        axios.post("/login", { userId: user.sub }).then(response => {
          this.props.login(response.data.user);
          this.props.history.push("/home");
        });
      });
    });
  }

  login() {
    this.lock.show();
  }

  render() {
    return (
      <div className="login-page">
        <div className="login-box">
          <h1 className="title">DreamBoard</h1>
          <button className="login-btn" onClick={this.login}>
            Login/Register
          </button>
        </div>
      </div>
    );
  }
}

//Dispatches login data to Store/Reducer
const mapDispatchToProps = {
  login: login
};

export default connect(null, mapDispatchToProps)(Login);
