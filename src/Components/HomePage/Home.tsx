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

  useEffect(() => {
    if (data !== null) {
      console.log(data);
    }
  }, [data]);

  const handleSearchSubmit = async (address: string[], chain: Chain) => {
    setLoading(true); // Set loading state to true when submit starts
    console.log("Address ", address);
    console.log("Chain: ", chain.label, chain.value);
    const uniqueAddresses = Array.from(new Set(address));
    setSearchInput({ address: uniqueAddresses, chain });
    try {
      if (uniqueAddresses.length === 1) {
        setData(await Service.getWalletData(uniqueAddresses[0], chain.value));
      } else {
        setData(
          await Service.getMultipleWalletData(uniqueAddresses, chain.value)
        );
      }
    } catch (error) {
      console.error("Error Fetching Data: ", error);
    }
    setLoading(false); // Set loading state to false when submit finishes
  };

  return (
    <div className="app-container">
      <section className="header-section">
        <Header />
      </section>
      <div className="center-content">
        {/* Main title added here */}
        <Typography variant="h2" gutterBottom className="main-title">
          Discover In-Depth Insights
        </Typography>
        <Typography variant="body1" className="subtext"mb={6}>
          Gain valuable insights into how your users interact with your applications and compare their behavior acros: competitor platforms. With UXly's intuitive and visual analytics, you can discover, consolidate, and communicate user needs effortlessly.
        </Typography>
        <div>
        </div>
        <Search onSubmit={handleSearchSubmit} />
        <Typography variant="subtitle1" color="white" mt={3}>
          Example wallet ID: 0x26fcbd3afebbe28d0a8684f790c48368d21665b5
        </Typography>
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
