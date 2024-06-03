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

  const handleSearchSubmit = async (searchValue: string, chain: Chain) => {
    setLoading(true); // Set loading state to true when submit starts
    setSearchSubmitted(true); // Set the search as submitted\
    setIsSearchInHeader(true);
    console.log('Address ', searchValue);
    console.log('Chain: ', chain.label, chain.value);

    var addressExists = Service.queryAddress(searchValue);

    addressExists.then(async (result) => {
      console.log('Checking if the result is null or undefined');
      let isEmpty = false;

      if (result === null || result === undefined) {
        isEmpty = true;
      } else if (typeof result === 'string' || Array.isArray(result)) {
        if (result.length === 0) {
          isEmpty = true;
        }
      } else if (typeof result === 'object') {
        if (Object.keys(result).length === 0) {
          isEmpty = true;
        }
      }

      if (isEmpty) {
        // Split the searchValue by commas and trim whitespace from each address
        const uniqueAddresses = searchValue
          .split(',')
          .map((addr) => addr.trim());
        setSearchInput({ address: uniqueAddresses, chain });
        try {
          if (uniqueAddresses.length === 1) {
            setData(
              await Service.getWalletData(uniqueAddresses[0], chain.value),
            );
            console.log('Adding address to the database');
            Service.addAddressToDatabase(searchValue);
          } else {
            // TODO: Add a check for multiple addresses already in the database
            // and some logic here for adding the ones that aren't in it -> can
            // be some sort of array that will just contain the ones not in it
            setData(
              await Service.getMultipleWalletData(uniqueAddresses, chain.value),
            );
          }
        } catch (error) {
          console.error('Error Fetching Data: ', error);
        }
        setLoading(false); // Set loading state to false when submit finishes
      } else {
        const uniqueAddresses = searchValue
          .split(',')
          .map((addr) => addr.trim());
        setSearchInput({ address: uniqueAddresses, chain });
        try {
          if (uniqueAddresses.length === 1) {
            console.log('getting data for transactions from the database');
            setData(
              await Service.getWalletDataFromDb(
                uniqueAddresses[0],
                chain.value,
              ),
            );
          } else {
            // TODO: Make it also work for multiple addresses!
            setData(
              await Service.getMultipleWalletData(uniqueAddresses, chain.value),
            );
          }
        } catch (error) {
          console.error('Error Fetching Data: ', error);
        }
        setLoading(false); // Set loading state to false when submit finishes
      }
    });
  };

  return (
    <div className="app-container">
      <div
        className={`app-container ${isSearchInHeader ? 'search-active' : ''}`}
      >
        <section className="header-section">
          <Header />
        </section>

        <div className="center-content">
          <div className={`search-area ${isSearchInHeader ? 'move-up' : ''}`}>
            <Typography variant="subtitle1" color="white" mt={-5} mb={-5}>
              Example wallet ID: 0x26fcbd3afebbe28d0a8684f790c48368d21665b5
            </Typography>
            <Search
              className={
                isSearchInHeader ? 'search-in-header' : 'search-default'
              }
              onSearchSubmit={(searchValue) =>
                handleSearchSubmit(searchValue, selectedChain)
              }
              onChainSelected={setSelectedChain}
            />
            <Typography variant="h4" color="white" paddingTop={2} mb={-20}>
              Get Web3 Wallet Data
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
                  <WalletInfo wallets={data} />
                  <WalletAge />
                  <AudienceGrowth />
                  <DisplayMultipleWallet
                    wallets={data}
                    chain={searchInput?.chain || { value: '', label: '' }}
                  />
                </>
              ) : (
                <Grid item xs={12}>
                  <strong className="loaded-data">
                    Error fetching data. Try again
                  </strong>
                </Grid>
              )
            ) : data.address !== 'null' ? (
              <DisplayWalletData
                walletData={data}
                chain={searchInput?.chain || { value: '', label: '' }}
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
