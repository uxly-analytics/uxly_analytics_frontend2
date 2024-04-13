import React from "react";
import '../HomePage/HomeComponents/home.css';
import './Components/landingPage.css';
import LandingHeader from './LandingHeader';
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import Button from '@mui/material/Button';


function LandingPage(){
    const navigate = useNavigate(); // Create the navigate function

    // Function to handle button click
    const handleLogIn = () => {
        navigate('/signup'); // Navigate to the /signup route
    };

    return(
        <div className="app-container">
            <section className="header-section">
              <LandingHeader />
            </section>
            <div className="center-content">
            <Typography className="main-title"
                        variant="h2" 
                        color="white" 
                        marginTop={10}
                        gutterBottom >
           Discover In-Depth Insights
         </Typography>
         <Typography className="subtext"
                     variant="h6" 
                     color="white" 
                     mb={6}
                     width={1000}>
           Gain valuable insights into how your users interact with your applications and compare their behavior across competitor platforms. With UXly's intuitive and visual analytics, you can discover, consolidate, and communicate user needs effortlessly.
         </Typography>
         <section className="login-section" > 
         <div className="login-btn">
         <Button className="login-txt" onClick={handleLogIn} >
                Get Started
              </Button>
              </div>
              </section>
            </div>
        </div>
    )
}

export default LandingPage;