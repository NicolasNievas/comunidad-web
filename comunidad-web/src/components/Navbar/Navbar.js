import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="global-header-container">
      <div className='navbar-container'>
        <h1 className='navbar-left'>Clothing</h1>

        <nav className='navbar-right'>
          <ul className='navbar-ul'>
            <li className='navbar-li'><NavLink className="navbar-li-text" to="/" aria-label="Home">Home</NavLink></li>
            <li className='navbar-li'><NavLink className="navbar-li-text" to="/about" aria-label="About">About Us</NavLink></li>
            <li className='navbar-li'><NavLink className="navbar-li-text" to="/remeras" aria-label="Remeras">T-Shirts</NavLink></li>
            <li className='navbar-li'><NavLink className="navbar-li-text" to="/pantalones" aria-label="Pantalones">Pants</NavLink></li>
            <li className='navbar-li'><NavLink className="navbar-li-text" to="/buzos" aria-label="Buzos">Divers</NavLink></li>
            <li className='navbar-li'><NavLink className="navbar-li-text" to="/accesorios" aria-label="Accesorios">Accessories</NavLink></li>
            <li className='navbar-li'><NavLink className="navbar-li-text" to="/add" aria-label="Add">Manage</NavLink></li>
          </ul>
          <div className="navbar-dropdown">
            <NavLink className="navbar-li-text" to="/" aria-label="Home">Home</NavLink>
            <NavLink className="navbar-li-text" to="/about" aria-label="About">About Us</NavLink>
            <NavLink className="navbar-li-text" to="/remeras" aria-label="Remeras">T-Shirts</NavLink>
            <NavLink className="navbar-li-text" to="/pantalones" aria-label="Pantalones">Pants</NavLink>
            <NavLink className="navbar-li-text" to="/buzos" aria-label="Buzos">Divers</NavLink>
            <NavLink className="navbar-li-text" to="/accesorios" aria-label="Accesorios">Accessories</NavLink>
            <NavLink className="navbar-li-text" to="/add" aria-label="Add">Manage</NavLink>
          </div>
        </nav >
      </div>
    </div>
  );
}

export default Navbar;
