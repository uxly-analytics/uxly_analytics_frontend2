import React from "react";
import BalanceGraph from "./BalanceGraph";
import "../displaywallet.css";
import { Grid } from "@mui/material";

interface WalletData {
  address: string;
  activeChainsSimplified: any;
  nativeBalance: any;
  nft: any;
  tokenBalance: any;
  transactions: any;
  transactionsData: any;
}

interface ChainBalance {
  chain: string;
  balance: string;
}

const DisplayBalance: React.FC<{ walletData: WalletData }> = ({
  walletData,
}) => {
  const labels: string[] = walletData.nativeBalance.map(
    (obj: ChainBalance) => obj.chain
  );
  const balances: number[] = walletData.nativeBalance.map((obj: ChainBalance) =>
    parseFloat(obj.balance)
  );
  return (
    <Grid item xs={12}>
      <BalanceGraph data={balances} labels={labels} />
    </Grid>
  );
};

export default DisplayBalance;
