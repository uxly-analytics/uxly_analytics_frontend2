import React from 'react';
import './SignUp.css';
import Logo from './images/Logo.png';
import { Link } from '@mui/material';
// import { handler } from 'tailwindcss-animate';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";


const Header: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

  function handleLogIn() {
    loginWithRedirect(); // navigate('/login');
  }

  // function handleSignUp() {
  //  navigate('/signup');
  // }

  return (
    <header className="header">
      <div className="logo-container">
        <img src={Logo} alt="UXly Logo" className="logo" />
      </div>
      <div className="links-container">
        <section className='logout-button-container'>
        <label className="log-in-button" onClick={handleLogIn}>
          Log-in
        </label>
        </section>
        <section className='logout-button-container'>
        {/* this will link to sign up page once it is created */}
        <label className="sign-up-button" onClick={handleLogIn}>
          Sign-up
        </label>
        </section>
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
