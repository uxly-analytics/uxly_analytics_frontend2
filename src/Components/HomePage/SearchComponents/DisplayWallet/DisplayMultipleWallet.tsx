import React from "react";
import DisplayMultipleBalance from "./MultipleWalletComponents/DisplayMultipleBalance";
import MultipleTransactionDetailsTable from "./MultipleWalletComponents/MultipleTransactionDetailsTable";
import BalanceDistribution from "./MultipleWalletComponents/BalanceDistribution";
import BoxWrapper from "../../HomeComponents/BoxWrapper/BoxWrapper";
//import MultipleWalletFilterGraph from "./MultipleWalletComponents/TransactionGraph/TransacationGraph";

interface WalletData {
  address: string;
  networth: any;
  nft: any;
  tokenBalance: any;
  transactions: any;
  transactionsData: any;
}

interface DisplayMultipleWalletProps {
  wallets: WalletData[];
  chain: { value: string; label: string };
}

const DisplayMultipleWallet: React.FC<DisplayMultipleWalletProps> = ({
  wallets,
  chain,
}) => {
  const renderWalletData = () => {
    return (
      <>
        <DisplayMultipleBalance wallets={wallets} />
        <BalanceDistribution wallets={wallets}/>
        <MultipleTransactionDetailsTable wallets={wallets} />
      </>
    );
  };

  return <>{renderWalletData()}</>;
};

export default DisplayMultipleWallet;
