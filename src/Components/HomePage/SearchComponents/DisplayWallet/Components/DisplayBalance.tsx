import React from "react";
import NetworthGraph from "./NetworthGraph";
import NativeBalanceGraph from "./NativeBalanceGraph";
import "../displaywallet.css";
import { Grid } from "@mui/material";
import FilterGraph from "./WalletFilterGraph";
import BoxWrapper from "../../../HomeComponents/BoxWrapper/BoxWrapper";

interface WalletTransaction {
  fromAddress: string;
  toAddress: string;
  value: number;
  decimalValue: number;
  blockTimestamp: number;
  blockHash: string;
  gasPrice: string;
}

interface WalletData {
  networth: {
      total_networth_usd: string;
      chains: ChainNetWorth[];
  };
  address: string;
  nfts: any;
  tokenBalance: any;
  transactions: WalletTransaction[];
  transactionsData: any;
}

interface ChainNetWorth{
  chain: string;
  native_balance_formatted: string;
  native_balance_usd: string;
  networth_usd: string;
  token_balance_usd: string;
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

const DisplayBalance: React.FC<{ walletData: WalletData }> = ({
  walletData,
}) => {
    const chains : ChainNetWorth[] = walletData.networth.chains;
    const labels: string[] = chains.map(chain => chain.chain);
    const chainNetWorth: number[] = chains.map(chain => parseFloat(chain.networth_usd));
    const nativeBalance: number[] = chains.map(chain => parseFloat(chain.native_balance_formatted));
    const nativeBalanceUSD: number[] = chains.map(chain => parseFloat(chain.native_balance_usd));
    const tokenBalance: number [] = chains.map(chain => parseFloat(chain.token_balance_usd));
    const totalNetworth = NumberComponent({numberString: walletData.networth.total_networth_usd});
  
  return (
    
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <BoxWrapper
            title={"Wallet Value:"}
            titleSX={{ textAlign: "center",}}
            value={`$${totalNetworth}`}
          />
        </Grid>
        <Grid item xs={6}>
          <BoxWrapper
            title={"Wallet Age"}
            titleSX={{ textAlign: "center" }}
            value={`Mature`}
          />
        </Grid>
      </Grid>
      <FilterGraph
          wallets={[walletData]}
        />
      <NetworthGraph labels = {labels} chainNetWorth = {chainNetWorth} total={walletData.networth.total_networth_usd}/>
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
