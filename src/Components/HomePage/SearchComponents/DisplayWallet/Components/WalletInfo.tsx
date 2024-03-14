import { Grid } from "@mui/material";
import React from "react";
import BoxWrapper from "../../../HomeComponents/BoxWrapper/BoxWrapper";

interface WalletData {
  address: string;
  networth: any;
  nft: any;
  tokenBalance: any;
  transactions: any;
  transactionsData: any;
}

interface WalletInfoProps {
  wallets: WalletData[];
}

const WalletInfo: React.FC<WalletInfoProps> = ({wallets}) => {
  let numWallets = 0;
  const totalNetWorthUSD: number = wallets.reduce((acc, wallet) => {
    const totalNetWorthUSD = parseFloat(wallet.networth.total_networth_usd);
    numWallets ++;
    return acc + totalNetWorthUSD;
  }, 0);
  const total: string = `$${totalNetWorthUSD.toFixed(2)}`;
  return (
    <>
      <Grid item xs={6}>
        <BoxWrapper title="Total Networth Across Wallets" value={total} />
      </Grid>
      <Grid item xs={3}>
        <BoxWrapper title="Number of Wallets" value={numWallets} />
      </Grid>
      <Grid item xs={2}>
        <BoxWrapper title="Number of Active Users" value="132" />
      </Grid>
    </>
  );
};

export default WalletInfo;
