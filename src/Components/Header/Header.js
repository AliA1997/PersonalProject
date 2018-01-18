import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className='main-header-container'>
                <div className='header'>
                <h3>SeizeMyDream</h3>
                <Link to='/home' className='header-link'>Home</Link>
                <Link to='/searchdreams' className='header-link'>Search</Link>
                <Link to='/myaccount' className='header-link'>Account</Link>
                <Link to='/uploaddream' className='header-link'>Upload</Link>
                <Link to='/' className='header-link'>Logout</Link>
                </div>
            </div>
        )
    }
}



export default Header;