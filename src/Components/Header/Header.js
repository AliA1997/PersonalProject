import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../styles/Header.css';
import logo from '../styles/imageedit_3_4114329595.png'

class Header extends Component {
    render() {
        return (
            <div className='main-header-container'>
                <div className='header'>
                <img className='logo' src={logo} />
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
