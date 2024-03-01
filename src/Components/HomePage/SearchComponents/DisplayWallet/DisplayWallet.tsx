import React from "react";
import DisplayBalance from "./Components/DisplayBalance";
import DisplayNFTs from "./Components/DisplayNFTs";
import TransactionDetailsTable from "./Components/TransactionDetailsTable";
import TransactionTable from "./Components/TransactionTable";
import "./displaywallet.css";
import { Grid } from "@mui/material";
import WidgetBox from "../../HomeComponents/WidgetBox/WidgetBox";
import TokenBalance from "./Components/TokenBalance";

interface WalletData {
  address: string;
  activeChainsSimplified: any;
  nativeBalance: any;
  nft: any;
  tokenBalance: any;
  transactions: any;
  transactionsData: any;
}

interface DisplayWalletDataProps {
  walletData: WalletData;
  chain: { value: string; label: string };
}

const DisplayWalletData: React.FC<DisplayWalletDataProps> = ({
  walletData,
  chain,
}) => {
  console.log("Wallet data is:", walletData);
  console.log("Tokens are:", walletData.tokenBalance);
  const renderWalletData = () => {
    return (
      <Grid container item spacing={3}>
        <Grid item xs={12}>
          <DisplayBalance walletData={walletData} />
        </Grid>
        {/* Left column */}
        <Grid item xs={12}>
          <WidgetBox
            title="Transaction History"
            titleSX={{ textAlign: "center", mb: 3 }}
          >
            <TransactionTable
              walletData={walletData}
              address={walletData.address}
            />
          </WidgetBox>
        </Grid>
        <Grid container item xs={12}>
          <DisplayNFTs walletData={walletData} />
        </Grid>
        {walletData.tokenBalance && Array.isArray(walletData.tokenBalance) && (
          <Grid item xs={12}>
            <WidgetBox
              title="Token Balance"
              titleSX={{ textAlign: "center", mb: 3 }}
            >
              <TokenBalance
                data={walletData.tokenBalance.filter(
                  (x: any) => x.split(" ").length > 2 || x.includes("$")
                )}
              />
            </WidgetBox>
          </Grid>
        )}
      </Grid>
    );
  };

  return <div>{renderWalletData()}</div>;
};

export default DisplayWalletData;
