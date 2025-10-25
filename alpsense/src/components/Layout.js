import React from 'react';
import Header from './Header';
import Navbar from './Navbar';
import CodingInterface from './CodingInterface';

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <Navbar />
      <CodingInterface />
    </div>
  );
};

export default Layout;