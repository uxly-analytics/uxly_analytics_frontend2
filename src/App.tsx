import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
            {/* Redirect from "/" to "/login" */}
            <Route path="/" element={<Navigate to="/login" />}/>
            {/*<Route path="/login" element={<Account/>} />*/}
            {/* Add more routes as needed */}
        </Routes>
      </Router>
  );
}

export default App;
