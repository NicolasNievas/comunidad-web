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
            <li className='navbar-li'><NavLink className="navbar-li-text" to="/about" aria-label="About">About Us</NavLink></li>
            <li className='navbar-li'><NavLink className="navbar-li-text" to="/remeras" aria-label="Remeras">T-Shirts</NavLink></li>
            <li className='navbar-li'><NavLink className="navbar-li-text" to="/pantalones" aria-label="Pantalones">Pants</NavLink></li>
            <li className='navbar-li'><NavLink className="navbar-li-text" to="/buzos" aria-label="Buzos">Divers</NavLink></li>
            <li className='navbar-li'><NavLink className="navbar-li-text" to="/accesorios" aria-label="Accesorios">Accessories</NavLink></li>
          </ul>
        </nav >
      </div>

    </div>
  );
}

export default Navbar;
