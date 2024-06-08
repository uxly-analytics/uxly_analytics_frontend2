import React from "react";
import NetworthGraph from "./NetworthGraph";
import NativeBalanceGraph from "./NativeBalanceGraph";
import "../displaywallet.css";
import { Grid } from "@mui/material";

interface WalletData {
  networth: {
      total_networth_usd: string;
      chains: ChainNetWorth[];
  };
  botEstimation: number;
}

interface ChainNetWorth{
  chain: string;
  native_balance_formatted: string;
  native_balance_usd: string;
  networth_usd: string;
  token_balance_usd: string;
}

const DisplayBalance: React.FC<{ walletData: WalletData }> = ({
  walletData,
}) => {
    const chains : ChainNetWorth[] = walletData.networth.chains;
    const labels: string[] = chains.map(chain => chain.chain);
    const chainNetWorth: number[] = chains.map(chain => parseFloat(chain.networth_usd));
    const nativeBalance: number[] = chains.map(chain => parseFloat(chain.native_balance_formatted));
    const nativeBalanceUSD: number[] = chains.map(chain => parseFloat(chain.native_balance_usd));
    const tokenBalance: number [] = chains.map(chain => parseFloat(chain.token_balance_usd));
    const botEstimation : number = walletData.botEstimation;
  
  return (
    <Grid item xs={12}>
      <NetworthGraph labels = {labels} chainNetWorth = {chainNetWorth} total={walletData.networth.total_networth_usd} botEstimation={botEstimation}/>
      <br/>
      <NativeBalanceGraph
          labels={labels}
          nativeBalance={nativeBalance}
          nativeBalanceUSD={nativeBalanceUSD}
          tokenBalanceUSD={tokenBalance}
      />
    </Grid>
  );
};

export default DisplayBalance;
