import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/HomePage/Home";
import Streams from "./Components/StreamsPage/Streams";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect from "/" to "/login" */}
        <Route path="/" element={<Home />} />
        {/*<Route path="/login" element={<LandingPage />} */}
        <Route path="/streams" element={<Streams />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
