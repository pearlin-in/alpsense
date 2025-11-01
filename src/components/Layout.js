import React from 'react';
import Header from './Header';
import Navbar from './Navbar';
import ComponentSidebar from './ComponentSidebar';
import CodingInterface from './CodingInterface';

const Layout = ({ isPythonMode }) => {
  return (
    <div className="layout">
      <Header />
      <Navbar />
      <div className="main-content">
        <ComponentSidebar />
        <div className="coding-area">
          <CodingInterface isPythonMode={isPythonMode} />
        </div>
      </div>
    </div>
  );
};

export default Layout;