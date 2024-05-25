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

const NumberComponent = ({ numberString }: { numberString: string }): string => {
  const addCommasToNumberString = (numberString: string): string => {
    const number = parseFloat(numberString);
    if (!isNaN(number)) {
      return number.toLocaleString();
    } else {
      return numberString;
    }
  };

  return addCommasToNumberString(numberString);
};

const WalletInfo: React.FC<WalletInfoProps> = ({ wallets }) => {
  let numWallets = 0;
  const totalNetWorthUSD: number = wallets.reduce((acc, wallet) => {
    const totalNetWorthUSD = parseFloat(wallet.networth.total_networth_usd);
    numWallets++;
    return acc + totalNetWorthUSD;
  }, 0);
  const total: string = NumberComponent({ numberString: totalNetWorthUSD.toString() });

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item xs={12}>
        <BoxWrapper title="Total Networth Across Wallets" value={`$${total}`} />
      </Grid>
      <Grid item xs={12}>
        <BoxWrapper title="Number of Wallets" value={numWallets} />
      </Grid>
    </Grid>
  );
};

export default WalletInfo;
