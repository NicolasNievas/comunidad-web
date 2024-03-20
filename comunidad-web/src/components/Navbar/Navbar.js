// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="global-header-container">
      <div className='navbar-container'>
        <h1 className='navbar-left'>NavBar</h1>

        <nav className='navbar-right'>
          <ul className='navbar-ul'>
            <li className='navbar-li'><NavLink className="navbar-li-text" to="/" aria-label="Home">Home</NavLink></li>
            <li className='navbar-li'><NavLink className="navbar-li-text" to="/root" aria-label="Root">Root</NavLink></li>
            <li className='navbar-li'><NavLink className="navbar-li-text" to="/route1" aria-label="Route1">Route1</NavLink></li>
          </ul>
        </nav >
      </div>

    </div>
  );
}

export default Navbar;
