import React from 'react';
import BlocksPalette from './BlocksPalette';
import '../styles/Navbar.css';

const Navbar = ({ activeNavItem, setActiveNavItem, selectedNavOption, setSelectedNavOption, setBlocks }) => {
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
    // Toggle active nav item; if switching items, clear selected option
    const newItem = activeNavItem === item ? null : item;
    setActiveNavItem(newItem);
    if (newItem === null) setSelectedNavOption(null);
    else setSelectedNavOption(null);
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
                  className={`curved-button ${selectedNavOption === option ? 'selected' : ''}`}
                  onClick={() => setSelectedNavOption(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Blocks palette: render inside the left-side popup below the option buttons */}
            {selectedNavOption && (() => {
              // Map verbose option labels (e.g. "Speaker Configuration") to palette item keys (e.g. "Speaker")
              const derivePaletteItem = (option) => {
                if (!option) return option;
                const o = option.toLowerCase();
                if (o.includes('speaker')) return 'Speaker';
                if (o.includes('rgb')) return 'RGB LED';
                if (o.includes('power')) return 'Power';
                if (o.includes('touch')) return 'Touch Sensor';
                if (o.includes('vibration')) return 'Vibration Motor';
                if (o.includes('screen')) return 'Screen Layout';
                return option;
              };

              const paletteItem = derivePaletteItem(selectedNavOption);

              return (
                <div className="popup-palette">
                  <h4>Blocks for: {selectedNavOption}</h4>
                  <BlocksPalette category={activeNavItem} item={paletteItem} onAddBlock={(b) => {
                    const newBlock = { type: b.type ? b.type.toLowerCase() : 'custom', label: b.label || b.type, value: b.label || '' };
                    setBlocks((prev) => [...prev, newBlock]);
                  }} />
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;