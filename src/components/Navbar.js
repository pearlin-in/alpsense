import React, { useState } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [activeNavItem, setActiveNavItem] = useState(null);

  const navItems = [
    'EVENT', 'UI', 'HARDWARE', 'UNITS', 'MODULES', 
    'IOT CLOUD', 'MC CLOUD', 'EZDATA', 'VARIABLES', 
    'LOOPS', 'LOGIC'
  ];

  const navOptions = {
    'HARDWARE': ['Speaker Configuration', 'RGB LED Control', 'Power Management', 'Touch Sensors', 'Vibration Motor'],
    'UI': ['Screen Layout Editor', 'Display Settings', 'Theme Customization', 'Widget Library'],
    'EVENT': ['Click Handlers', 'Load Events', 'Timer Functions', 'Sensor Triggers'],
    'MODULES': ['Math Functions', 'String Operations', 'Network APIs', 'File System'],
    'IOT CLOUD': ['Cloud Connection', 'Data Synchronization', 'Remote Control'],
    'VARIABLES': ['Create Variable', 'Global Variables', 'Local Variables', 'Constants']
  };

  const handleNavItemClick = (item) => {
    setActiveNavItem(activeNavItem === item ? null : item);
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="nav-container">
          {navItems.map((item, index) => (
            <div 
              key={index} 
              className={`nav-item ${activeNavItem === item ? 'active' : ''}`}
              onClick={() => handleNavItemClick(item)}
            >
              {item}
            </div>
          ))}
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search components..."
            className="search-input"
          />
        </div>
      </nav>

      {/* Left Side Popup */}
      {activeNavItem && navOptions[activeNavItem] && (
        <div className="left-side-popup active">
          <div className="popup-header">
            <h3>{activeNavItem} Options</h3>
            <button 
              className="popup-close"
              onClick={() => setActiveNavItem(null)}
            >
              ×
            </button>
          </div>
          <div className="popup-content">
            <div className="curved-buttons-container">
              {navOptions[activeNavItem].map((option, index) => (
                <button key={index} className="curved-button">
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;