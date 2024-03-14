import React from 'react';
import './home.css';
import Logo from '../HomePage/HomeComponents/images/Logo.png'
import { Link } from '@mui/material';

const StreamsHeader: React.FC = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={Logo} alt="UXly Logo" className="logo" />
      </div>
      <div>
        <Link href="/" className="about-us">
          Wallet
        </Link>
        <Link
          target="_blank"
          href="https://uxly.software/"
          className="about-us"
        >
          About Us
        </Link>
      </div>
    </header>
  );
};

export default StreamsHeader;
