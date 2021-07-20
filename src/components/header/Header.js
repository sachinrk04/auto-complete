import React from 'react';
import logo from '../../logo.svg';

import './Header.css';

function Headers() {
  return (
    <div className="Header">
        <header className="Header-header">
        <img src={logo} className="Header-logo" alt="logo" />
        <p>TRATAN</p>
        <a
            className="Header-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
        >
            Learn React
        </a>
        </header>
    </div>
  );
}

export default Headers
