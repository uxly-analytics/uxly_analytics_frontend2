import React, { useState, useEffect } from "react";
import Search from "./SearchComponents/Search";
import * as Service from "../../Services/WalletServices";
import DisplayWalletData from "./SearchComponents/DisplayWallet/DisplayWallet";
import DisplayMultipleWallet from "./SearchComponents/DisplayWallet/DisplayMultipleWallet";
import Header from "./HomeComponents/HomeHeader";
import LoadScreen from "./HomeComponents/LoadScreen";
import "./HomeComponents/home.css";
import { Box, Grid, Stack, Typography } from "@mui/material";
import WidgetBox from "./HomeComponents/WidgetBox/WidgetBox";
import AvalancheLogo from "./HomeComponents/images/Avalanche.png";
import EthereumLogo from "./HomeComponents/images/Ethereum.png";
import AndroidLogo from "./HomeComponents/images/android.png";
import FranceFlag from "./HomeComponents/images/france-flag.png";

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
        <Search onSubmit={handleSearchSubmit} />
        <Typography variant="subtitle1" color="white">
          Example wallet ID: 0x26fcbd3afebbe28d0a8684f790c48368d21665b5
        </Typography>
      </div>
      <Grid container maxWidth="85%" mt={4} columnSpacing={3} rowSpacing={4}>
        {loading && <LoadScreen />}
        {!loading && data && (
          <>
            <Grid item xs={6}>
              <WidgetBox title="Wallet Value" value="$5,349,788" />
            </Grid>
            <Grid item xs={3}>
              <WidgetBox title="Number of Wallet" value="1235" />
            </Grid>
            <Grid item xs={3}>
              <WidgetBox title="Number of Active Users" value="132" />
            </Grid>
            <Grid item xs={12}>
              <WidgetBox
                title="Wallet Age"
                titleSX={{ textAlign: "center", mb: 9 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <WidgetBox title="New" value="6235" />
                  </Grid>
                  <Grid item xs={2}>
                    <WidgetBox title="Young" value="434" />
                  </Grid>
                  <Grid item xs={2}>
                    <WidgetBox title="Medium" value="43" />
                  </Grid>
                  <Grid item xs={2}>
                    <WidgetBox title="Mature" value="766" />
                  </Grid>
                  <Grid item xs={2}>
                    <WidgetBox title="Established" value="545" />
                  </Grid>
                  <Grid item xs={2}>
                    <WidgetBox title="Veteran" value="43" />
                  </Grid>
                </Grid>
              </WidgetBox>
            </Grid>
            <Grid item xs={12}>
              <WidgetBox
                title="Audience Growth"
                boxSX={{ border: 0 }}
                titleSX={{ textAlign: "center", mb: 9 }}
              >
                <Grid container item spacing={3}>
                  <Grid item xs={12}>
                    <WidgetBox
                      title="Your audience is growing!"
                      titleSX={{ fontSize: 36 }}
                      boxSX={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      value="66%"
                      valueSX={{ color: "#01A643", fontSize: 96 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <WidgetBox title="Wallet Info" titleSX={{ mb: 3 }}>
                      <Stack direction="row" spacing={3} alignItems="center">
                        <Box
                          component="img"
                          width={75}
                          height={75}
                          src={AvalancheLogo}
                          sx={{ objectFit: "contain" }}
                        />
                        <Typography color="white" fontSize="36px">
                          %43 of your audience has more than 3 AVAX
                        </Typography>
                      </Stack>
                    </WidgetBox>
                  </Grid>
                  <Grid item xs={6}>
                    <WidgetBox title="Device Usage" titleSX={{ mb: 3 }}>
                      <Stack direction="row" spacing={3} alignItems="center">
                        <Box
                          component="img"
                          width={75}
                          height={75}
                          src={EthereumLogo}
                          sx={{ objectFit: "contain" }}
                        />
                        <Typography color="white" fontSize="36px">
                          %13 of your audience has more than 50 USDT
                        </Typography>
                      </Stack>
                    </WidgetBox>
                  </Grid>
                  <Grid item xs={6}>
                    <WidgetBox title="Country" titleSX={{ mb: 3 }}>
                      <Stack direction="row" spacing={3} alignItems="center">
                        <Box
                          component="img"
                          width={75}
                          height={75}
                          src={AndroidLogo}
                          sx={{ objectFit: "contain" }}
                        />
                        <Typography color="white" fontSize="36px">
                          %55 of your audience uses ANDROID
                        </Typography>
                      </Stack>
                    </WidgetBox>
                  </Grid>
                  <Grid item xs={6}>
                    <WidgetBox title="Country" titleSX={{ mb: 3 }}>
                      <Stack direction="row" spacing={3} alignItems="center">
                        <Box
                          component="img"
                          width={75}
                          height={75}
                          sx={{ objectFit: "contain" }}
                          src={FranceFlag}
                        />
                        <Typography color="white" fontSize="36px">
                          Your audience growing in FRANCE %5
                        </Typography>
                      </Stack>
                    </WidgetBox>
                  </Grid>
                </Grid>
              </WidgetBox>
            </Grid>
            {Array.isArray(data) ? (
              data.length !== 0 ? (
                <Grid item xs={12}>
                  <DisplayMultipleWallet
                    wallets={data}
                    chain={searchInput?.chain || { value: "", label: "" }}
                  />
                </Grid>
              ) : (
                <strong className="loaded-data">
                  Error fetching data. Try again
                </strong>
              )
            ) : data.address !== "null" ? (
              <Grid item xs={12}>
                <DisplayWalletData
                  walletData={data}
                  chain={searchInput?.chain || { value: "", label: "" }}
                />
              </Grid>
            ) : (
              <Typography
                variant="subtitle1"
                mt={2}
                className="loaded-data"
                color="white"
              >
                Error fetching data. Try again
              </Typography>
            )}
          </>
        )}
      </Grid>
    </div>
  );
}

export default Home;
