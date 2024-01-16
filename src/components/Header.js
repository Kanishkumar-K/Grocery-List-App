// Header.js

import React from 'react';
import './Header.css'; // Import your CSS file

const Header = () => {
  return (
    <header>

 

      {/* Dummy Search Box */}
      <div className="search-box">
        <input type="text" placeholder="Search..." />
        <button type="button">Search</button>
      </div>
    </header>
  );
};

export default Header;
