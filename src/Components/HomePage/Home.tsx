import React, { useState, useEffect } from 'react';
import Search from './SearchComponents/Search';
import * as Service from '../../Services/WalletServices';
import DisplayWalletData from './SearchComponents/DisplayWallet/DisplayWallet';
import DisplayMultipleWallet from './SearchComponents/DisplayWallet/DisplayMultipleWallet';
import Header from './HomeComponents/HomeHeader';
import LoadScreen from './HomeComponents/LoadScreen';
import './HomeComponents/home.css';
import { Grid, Typography } from '@mui/material';

import WalletInfo from './SearchComponents/DisplayWallet/Components/WalletInfo';
import WalletAge from './SearchComponents/DisplayWallet/Components/WalletAge';
import AudienceGrowth from './SearchComponents/DisplayWallet/Components/AudienceGrowth';

interface AddressData {
  address: string;
}

interface AddressQueryResponse {
  config: object;
  data: AddressData[];
  headers: object;
  request: object;
  status: number;
  statusText: string;
}

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
  const [selectedChain, setSelectedChain] = useState<Chain>({
    value: '',
    label: '',
  });

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
    console.log('Addresses: ', addresses);
    console.log('Chain: ', chain.label, chain.value);

    const uniqueAddresses = addresses.map((addr) => addr.trim());
    setSearchInput({ address: uniqueAddresses, chain });

    const addressExistsPromises = uniqueAddresses.map((address) =>
      Service.queryAddress(address)
    );

    try {
      const results = await Promise.all(addressExistsPromises);
      const addressesToFetch = uniqueAddresses.filter((address, index) => {
        const result = results[index];
        if (result === null || result === undefined) {
          return true;
        } else if (typeof result === 'string' || Array.isArray(result)) {
          return result.length === 0;
        } else if (typeof result === 'object') {
          return Object.keys(result).length === 0;
        }
        return false;
      });

      if (addressesToFetch.length > 0) {
        try {
          if (addressesToFetch.length === 1) {
            setData(await Service.getWalletData(addressesToFetch[0], chain.value));
            Service.addAddressToDatabase(addressesToFetch[0]);
          } else {
            setData(await Service.getMultipleWalletData(addressesToFetch, chain.value));
          }
        } catch (error) {
          console.error('Error Fetching Data: ', error);
        }
      } else {
        try {
          if (uniqueAddresses.length === 1) {
            setData(await Service.getWalletDataFromDb(uniqueAddresses[0], chain.value));
          } else {
            setData(await Service.getMultipleWalletData(uniqueAddresses, chain.value));
          }
        } catch (error) {
          console.error('Error Fetching Data: ', error);
        }
      }
    } catch (error) {
      console.error('Error Checking Addresses: ', error);
    }

    setLoading(false); // Set loading state to false when submit finishes
  };

  return (
    <div className="app-container">
      <section className="header-section">
        <Header />
      </section>
      <div className="center-content">
      <div className={`search-area ${isSearchInHeader ? 'move-up' : ''}`}>
      <Typography variant="subtitle1" color="white" mt={-5} mb={-5}>
          Example wallet ID: 0x26fcbd3afebbe28d0a8684f790c48368d21665b5
        </Typography>
      <Search 
          className={isSearchInHeader ? "search-in-header" : "search-default"}
          onSubmit={handleSearchSubmit}      
        />
        <Typography variant="h4" color="white" paddingTop={2} mb={-20}>Get Web3 Wallet Data
        </Typography>
        </div>
      </div>
      <Grid container maxWidth="1198px" mt={4} columnSpacing={3} rowSpacing={4}>
        {loading && <LoadScreen />}
        {!loading && data && (
          <>
            {Array.isArray(data) ? (
              data.length !== 0 ? (
                <>
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
