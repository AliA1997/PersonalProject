import React, { Component } from 'react';
import './App.css';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Upload from './Components/Upload/Upload';
import MyBoard from './Components/Account/Myboard';
import Edit from './Components/Edit/Edit';
import {Route, Switch} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/(access_token.*)?' component={Login} />
          <Route path='/home' component={Home} />
          <Route path='/alterdream' component={Edit} />
          <Route path='/mydreams' component={MyBoard} />
          <Route path='/uploaddream' component={Upload} />
          </Switch>
      </div>
    );
  }
}

export default App;


// <header className="App-header">
// <img src={logo} className="App-logo" alt="logo" />
// <h1 className="App-title">Welcome to the Dream Machine</h1>
// </header>
// <p className="App-intro">
// You have to start somewhere.
// <Login />
// </p>