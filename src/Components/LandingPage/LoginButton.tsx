import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Login Button that redirects to auth0 login page
const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <button className="login-btn" onClick={handleLogin}>
      Sign Up / Login
    </button>
  );
};

export default LoginButton;
