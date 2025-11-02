import React, { useState } from 'react';
import '../styles/Navbar.css';
import BlocksPalette from './BlocksPalette';

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
    // reset selected option when changing category
    setSelectedOption(null);
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const mapOptionToItem = (option) => {
    // crude mapping (normalize names) - adapt as needed
    if (!option) return option;
    if (option.toLowerCase().includes('speaker')) return 'Speaker';
    if (option.toLowerCase().includes('rgb')) return 'RGB LED';
    if (option.toLowerCase().includes('power')) return 'Power';
    if (option.toLowerCase().includes('touch')) return 'Touch Sensor';
    if (option.toLowerCase().includes('vibration')) return 'Vibration Motor';
    if (option.toLowerCase().includes('screen')) return 'Screen Layout';
    return option;
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
                <button
                  key={index}
                  className={`curved-button ${selectedOption === option ? 'active' : ''}`}
                  onClick={() => setSelectedOption(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            {selectedOption && (
              <div className="popup-palette">
                <BlocksPalette category={activeNavItem} item={mapOptionToItem(selectedOption)} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;