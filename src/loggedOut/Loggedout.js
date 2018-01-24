import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class Loggedout extends Component {
  
    render() {
        return (
            <div>
                <h1>Oops, you're not logged-in</h1>
                <h2>Please click <Link to='/'>HERE</Link> to reach the Login page</h2>
            </div>
        )
    }
}

export default Loggedout;
