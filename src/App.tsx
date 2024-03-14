import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/HomePage/Home";
import LandingPage from "./Components/LandingPage/LandingPage";
import Login from "./Components/LoginPage/Login";
import SignUp from "./Components/SignUpPage/SignUp";
import Streams from "./Components/StreamsPage/Streams";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect from "/" to "/login" */}
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/*<Route path="/login" element={<LandingPage />} */}
        <Route path="/streams" element={<Streams />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
