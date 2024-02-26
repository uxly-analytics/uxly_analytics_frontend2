import React, { useState } from "react";
import Search from "./SearchComponents/Search";
import * as Service from "../../Services/WalletServices";
import DisplayWalletData from "./SearchComponents/DisplayWallet/DisplayWallet";
import Header from "./HomeComponents/HomeHeader";
import "./HomeComponents/home.css";

interface Chain {
  value: string;
  label: string;
}

function Home() {
  const [searchInput, setSearchInput] = useState<{
    address: string;
    chain: Chain;
  } | null>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearchSubmit = async (address: string, chain: Chain) => {
    setLoading(true); // Set loading state to true when submit starts
    console.log("Address ", address);
    console.log("Chain: ", chain.label, chain.value);
    setSearchInput({ address, chain });
    try {
      setData(await Service.getWalletData(address, chain.value));
    } catch (error) {
      console.error("Error Fetching Data: ", error);
    }
    console.log(data);
    setLoading(false); // Set loading state to false when submit finishes
  };

  return (
    <div>
      <div className="app-container">
        <section className="header-section">
          <Header />
        </section>
        <div className="center-content">
          <h1>Wallet Analytics</h1>
          <Search onSubmit={handleSearchSubmit} />
          <ul>Test Address: 0x26fcbd3afebbe28d0a8684f790c48368d21665b5</ul>
          <ul>
            Test Address for transactions:
            0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326
          </ul>
          {loading && <p>Fetching Data...</p>}
        </div>
      </div>
      <div>
        {!loading && data && (
          <div className="loaded-data">
            <DisplayWalletData
              walletData={data}
              chain={searchInput?.chain || { value: "", label: "" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

