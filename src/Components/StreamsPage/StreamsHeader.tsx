import React, { useState } from 'react';
import './home.css';
import Logo from '../HomePage/HomeComponents/images/Logo.png'
import {  Link } from '@mui/material';
import Menu from '../HomePage/HomeComponents/Menu';

const StreamsHeader: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <header className="header">
      <div className="logo-container">
        <img src={Logo} alt="UXly Logo" className="logo" />
      </div>
      <div className='routes-section'> 
      <section className='routes-section'> 
        <section className='routes-container'> 
        <Link href="/home" className="about-us">
          Wallet
        </Link>
        <Link
          target="_blank"
          href="https://uxly.software/"
          className="about-us"
        >
          About Us
        </Link>
        </section>
      </section>
      <section className='menu-container'>
         <Menu /> 
         </section>
         </div>
    </header>
  );
};

export default StreamsHeader;
