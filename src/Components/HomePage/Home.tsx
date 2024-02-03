import React from "react";
import Search from "./Components/Search";
import "./Components/home.css";

function Home(){

    const handleSearchSubmit = (address: string, chain: string) => {
        console.log("Address ", address);
        console.log("Chain: ", chain);
    };
    return(
        <div className="app-container">
            <div className="center-content">
            <Search onSubmit={handleSearchSubmit}/>
            </div>
        </div>
    )
}

export default Home;