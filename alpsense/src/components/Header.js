import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-top">
        <div className="company-name">ALPSENSE</div>
        <nav className="main-nav">
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
      </div>
    </header>
  );
};

export default Header;
