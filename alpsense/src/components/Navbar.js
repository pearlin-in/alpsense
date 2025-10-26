import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const navItems = [
    'EVENT', 'UI', 'HARDWARE', 'UNITS', 'MODULES', 
    'IOT CLOUD', 'MC CLOUD', 'EZDATA', 'VARIABLES', 
    'LOOPS', 'LOGIC'
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        {navItems.map((item, index) => (
          <div key={index} className="nav-item">
            {item}
          </div>
        ))}
      </div>

      {/* Search placed at the right side of the horizontal navbar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
        />
      </div>
    </nav>
  );
};

export default Navbar;
