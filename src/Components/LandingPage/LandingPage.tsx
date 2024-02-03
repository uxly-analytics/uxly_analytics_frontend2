import React from "react";
import { useNavigate } from 'react-router-dom';
import Login from "./Components/Login";
import "./Components/landingPage.css";
import Logo from "./Components/UXlyLogo.png";

function LandingPage(){
    const navigate = useNavigate();
    const handleLoginSubmit = (email: string, password: string) => {
        console.log("Email: ", email);
        console.log("Password: ", password);
        navigate("/home")
    };

    return(
        <div className="app-container">
            <div className="center-content">
                <img src={Logo} alt="UXly Logo"/>
                <Login onSubmit={handleLoginSubmit}/>
            </div>
        </div>
    )
}

export default LandingPage;