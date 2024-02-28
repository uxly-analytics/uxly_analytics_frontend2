import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/HomePage/Home";
import Streams from "./Components/StreamsPage/Streams";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect from "/" to "/login" */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/streams" element={<Streams />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
