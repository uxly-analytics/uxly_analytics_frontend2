import React from 'react';
import './SignUp.css';
import Logo from './images/Logo.png';
import { Link } from '@mui/material';
// import { handler } from 'tailwindcss-animate';
import { useNavigate } from 'react-router-dom';


const Header: React.FC = () => {
  const navigate = useNavigate();

  function handleLogIn() {
    navigate('/login');
  }

  function handleSignUp() {
    navigate('/signup');
  }

  return (
    <header className="header">
      <div className="logo-container">
        <img src={Logo} alt="UXly Logo" className="logo" />
      </div>
      <div className="links-container">
        <label className="log-in-button" onClick={handleLogIn}>
          Log-in
        </label>
        {/* this will link to sign up page once it is created */}
        <label className="sign-up-button" onClick={handleSignUp}>
          Sign-up
        </label>
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

export default Header;
