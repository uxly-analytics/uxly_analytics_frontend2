import React from "react";
import MultipleBalanceGraph from "./MultipleBalanceGraph";
import "./displaymultiplewallet.css";

interface WalletData {
  networth: {
      total_networth:string;
      chains: ChainNetWorth[];
  };
}

interface ChainNetWorth{
  chain: string;
  native_balance_formatted: string;
  native_balance_usd: string;
  networth_usd: string;
  token_balance_usd: string;
}

const DisplayMultipleBalance: React.FC<{ wallets: WalletData[] }> = ({
  wallets,
}) => {
  return (
    <>
      <MultipleBalanceGraph wallets={wallets}/>
    </>

  );
};

export default DisplayMultipleBalance;
