import React from "react";
import { Link } from '@mui/material';

const LSButton: React.FC = () => {

  const handleLogin = () => {
    <Link href="/" >
        Sign Up / Login
        </Link>
  };

  return (
    <button className="login-btn" onClick={handleLogin}>
      
    </button>
  );
};

export default LSButton;
