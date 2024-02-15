import React, { useState } from "react";
import Search from "./Components/Search";
import * as Service from "../../Services/WalletServices";
import "./Components/home.css";

function Home() {
  const [searchInput, setSearchInput] = useState<{ address: string; chain: string; } | null>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearchSubmit = async (address: string, chain: string) => {
    setLoading(true); // Set loading state to true when submit starts
    console.log("Address ", address);
    console.log("Chain: ", chain);
    setSearchInput({ address, chain});
    try{
      setData(await Service.getSingleAddressData(address, chain));
    }catch(error){
      console.error("Error Fetching Data: ", error);
    }
    console.log(data);
    setLoading(false); // Set loading state to false when submit finishes
  };

  return (
    <div>
      <div className="app-container">
        <div className="center-content">
          <h1>Wallet Analytics</h1>
          <Search onSubmit={handleSearchSubmit} />
          <ul>Test Address: 0x26fcbd3afebbe28d0a8684f790c48368d21665b5</ul>
          {loading && <p>Fetching Data...</p>}
        </div>
      </div>
      <div>
        {!loading && data && (
          <div className="loaded-data">
            <strong>Address {searchInput?.address}'s Data: </strong>
            {Object.entries(data).map(([key, value]) => (
                <div key={key}>
                    <strong>{key}:</strong>
                    {Array.isArray(value) ? (
                        <ul>
                          {value.map((item: any, index: number) => (
                            <li key={index}>
                              {typeof item === 'string' ? (
                                item
                              ) : (
                                Object.entries(item).map(([key, value]) => (
                                  <span key={key}>
                                    <strong>{key}:</strong> {JSON.stringify(value)}<br />
                                  </span>
                                ))
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>{JSON.stringify(value)}</p>
                      )}
                </div>
            ))}
          </div>
          )}
      </div>
    </div>
  );
}

export default Home;