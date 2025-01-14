import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navBar">
      {/* Logo */}
      <div className="logo">LOGO</div>

      {/* Navigation Links */}
      <ul className="navLinks">
        <li className="navItem">
          <Link to="/">Home</Link>
        </li>
        <li className="navItem">
          <Link to="/favourites">Favourites</Link>
        </li>
        <li className="navItem">
          <Link to="/about">About</Link>
        </li>
        <li className="navItem">
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>

      {/* Profile */}
      <div className="profile">Profile</div>
    </nav>
  );
}

export default Navigation;
