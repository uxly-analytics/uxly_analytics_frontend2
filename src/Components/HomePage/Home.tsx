import React, { useState, useEffect } from "react";
import Search from "./SearchComponents/Search";
import * as Service from "../../Services/WalletServices";
import DisplayWalletData from "./SearchComponents/DisplayWallet/DisplayWallet";
import DisplayMultipleWallet from "./SearchComponents/DisplayWallet/DisplayMultipleWallet";
import Header from "./HomeComponents/HomeHeader";
import LoadScreen from "./HomeComponents/LoadScreen";
import "./HomeComponents/home.css";
import { Grid, Typography } from "@mui/material";

import WalletInfo from "./SearchComponents/DisplayWallet/Components/WalletInfo";
import WalletAge from "./SearchComponents/DisplayWallet/Components/WalletAge";
import AudienceGrowth from "./SearchComponents/DisplayWallet/Components/AudienceGrowth";
import { da } from "date-fns/locale";

interface Chain {
  value: string;
  label: string;
}

function Home() {
  const [searchInput, setSearchInput] = useState<{
    address: string[];
    chain: Chain;
  } | null>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [isSearchInHeader, setIsSearchInHeader] = useState(false);
  const [selectedChain, setSelectedChain] = useState<Chain>({ value: '', label: '' });

  useEffect(() => {
    if (data !== null) {
      console.log(data);
    }
  }, [data]);

  const onChainSelected = (newChain: Chain) => {
    setSelectedChain(newChain);
  };

  const handleSearchSubmit = async (addresses: string[], chain: Chain) => {
    setLoading(true); // Set loading state to true when submit starts
    setSearchSubmitted(true); // Set the search as submitted\
    setIsSearchInHeader(true);
    console.log("Address ", addresses);
    console.log("Chain: ", chain.label, chain.value);

    // Split the searchValue by commas and trim whitespace from each address
   // const uniqueAddresses = Array.from(new Set(addresses));
    setSearchInput({ address: addresses, chain });
    try {
      if (addresses.length === 1) {
        const data = await Service.getWalletData(addresses[0], chain.value);
        setData(data);
      } else {
        const data = Service.getMultipleWalletData(addresses, chain.value);
        setData(data);
      }
    } catch (error) {
      console.error("Error Fetching Data: ", error);
    }
    setLoading(false); // Set loading state to false when submit finishes
  };

  return (
    <div className="app-container">
      <div className={`app-container ${isSearchInHeader ? 'search-active' : ''}`}>

    <section className="header-section">
      <Header />
    </section>
    
    <div className="center-content" >
      <div className={`search-area ${isSearchInHeader ? 'move-up' : ''}`}>
      <Typography variant="subtitle1" color="white" mt={-5} mb={-5}>
          Example wallet ID: 0x26fcbd3afebbe28d0a8684f790c48368d21665b5
        </Typography>
        <Search 
          className={isSearchInHeader ? "search-in-header" : "search-default"}
          onSubmit={handleSearchSubmit}
          onChainSelected={setSelectedChain}        
        />
        <Typography variant="h4" color="white" paddingTop={2} mb={-20}>Get Web3 Wallet Data
        </Typography>
        </div>
      </div>
      </div>
      <Grid container maxWidth="1198px" mt={4} columnSpacing={3} rowSpacing={4}>
        {loading && <LoadScreen />}
        {!loading && data && (
          <>
            {Array.isArray(data) ? (
              data.length !== 0 ? (
                <>
                  <WalletInfo wallets={data}/>
                  <WalletAge />
                  <AudienceGrowth />
                  <DisplayMultipleWallet
                    wallets={data}
                    chain={searchInput?.chain || { value: "", label: "" }}
                  />
                </>
              ) : (
                <Grid item xs={12}>
                  <strong className="loaded-data">
                    Error fetching data. Try again
                  </strong>
                </Grid>
              )
            ) : data.address !== "null" ? (
              <DisplayWalletData
                walletData={data}
                chain={searchInput?.chain || { value: "", label: "" }}
              />
            ) : (
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  mt={2}
                  className="loaded-data"
                  color="white"
                >
                  Error fetching data. Try again
                </Typography>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </div>
  );
}

export default Home;
