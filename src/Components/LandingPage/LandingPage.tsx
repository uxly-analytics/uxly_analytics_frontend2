import React from "react";
import "./Components/landingPage.css";
import LoginButton from './LoginButton';
import Header from './Header';

function LandingPage() {
    return (
        <div className="app-container">
            <section className="header-section">
                <Header />
                <h1>Discover In-Depth Insights</h1>
            </section>
            <section className="login-section">
                <div className="center-content">
                    <p style={{ marginBottom: '3rem' }}>Gain valuable insights into how your users interact with your applications and compare their behavior across competitor platforms. With UXly's intuitive and visual analytics, you can discover, consolidate, and communicate user needs effortlessly.</p>
                    <LoginButton />
                </div>
            </section>
        </div>
    );
}


export default LandingPage;
