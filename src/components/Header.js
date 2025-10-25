import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-top">
        <div className="company-name">ALPSENSE</div>
        <nav className="main-nav">
          <a href="#home">HOME</a>
          <a href="#about">ABOUT</a>
          <a href="#solutions">SOLUTIONS</a>
          <a href="#courses">COURSES</a>
          <a href="#contact">CONTACT US</a>
          <a href="#profile">PROFILE</a>
        </nav>
      </div>
      
      <div className="header-bottom">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-input"
          />
        </div>
        <div className="auth-buttons">
          <button className="login-btn">Login</button>
          <button className="get-started-btn">Get Started</button>
        </div>
      </div>
    </header>
  );
};

export default Header;