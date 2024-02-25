import React from "react";
import "./home.css";

const LoadScreen: React.FC = () => {
  return (
    <div className="circle-loader-container">
      <div className="circle-loader"></div>
    </div>
  );
};

export default LoadScreen;
