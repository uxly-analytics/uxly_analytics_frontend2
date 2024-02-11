import React from "react";
import "./Components/landingPage.css";
import LoginButton from './LoginButton';
import Header from './Header';


function LandingPage(){

    return(
        <div className="app-container">
            <section className="header-section">
              <Header />
            </section>
            <section className="login-section">
            <div className="center-content">
                <LoginButton />
            </div>
            </section>
        </div>
    )
}

export default LandingPage;