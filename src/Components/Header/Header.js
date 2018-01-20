import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className='main-header-container'>
                <div className='header'>
                <Link to ='/home'><h2 className='header-link'>SeizeMyDream</h2></Link>
                <Link to='/mydreams' className='header-link'>My Dreams</Link>
                {/* <Link to='/alterdream' className='header-link'>Edit</Link> */}
                <Link to='/uploaddream' className='header-link'>Upload</Link>
                <Link to='/' className='header-link'>Logout</Link>
                </div>
            </div>
        )
    }
}



export default Header;
