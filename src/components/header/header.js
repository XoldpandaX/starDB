import React from 'react';

import './header.css';

const Header = () => {
  return (
    <div className='header'>
      <h2>Star DB</h2>
      <ul>
        <li>People</li>
        <li>Planets</li>
        <li>Star Ships</li>
      </ul>
    </div>
  );
};

export default Header;
