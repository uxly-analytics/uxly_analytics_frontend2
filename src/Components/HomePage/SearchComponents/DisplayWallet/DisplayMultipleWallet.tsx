import React, { useState } from "react";
import { Grid } from "@mui/material";
import DisplayMultipleBalance from "./MultipleWalletComponents/DisplayMultipleBalance";
import MultipleTransactionDetailsTable from "./MultipleWalletComponents/MultipleTransactionDetailsTable";
import BalanceDistribution from "./MultipleWalletComponents/BalanceDistribution";
import WalletsFilter from "./MultipleWalletComponents/WalletsFilter";
import WalletInfo from "./Components/WalletInfo";

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
  const [filteredWallets, setFilteredWallets] = useState<WalletData[]>(wallets);

  const handleSaveChanges = (filteredWallets: WalletData[]) => {
    setFilteredWallets(filteredWallets);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <WalletsFilter wallets={wallets} onSaveChanges={handleSaveChanges} />
        </Grid>
        <Grid item xs={12} md={6}>
          <WalletInfo wallets={filteredWallets} />
        </Grid>
      </Grid>
      <DisplayMultipleBalance wallets={filteredWallets} />
      <BalanceDistribution wallets={filteredWallets} />
      <MultipleTransactionDetailsTable wallets={filteredWallets} />
    </>
  );
};

export default DisplayMultipleWallet;
