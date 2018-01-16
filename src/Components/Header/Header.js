import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className='main-header-container'>
                <div className='header'>
                <h3>App Title Goes Here</h3>
                <Link to='/home' className='header-link'>Home</Link>
                <Link to='/searchdreams' className='header-link'>Search</Link>
                <Link to='/myaccount' className='header-link'>Account</Link>
                <Link to='/myaccount' className='header-link'>Admin</Link>
                <Link to='/' className='header-link'>Logout</Link>
                </div>
            </div>
        )
    }
}



export default Header;
