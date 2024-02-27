import React from "react";
import DisplayMultipleBalance from "./MultipleWalletComponents/DisplayMultipleBalance";
import MultipleTransactionDetailsTable from "./MultipleWalletComponents/MultipleTransactionDetailsTable";

interface WalletData {
    address: string;
    activeChainsSimplified: any;
    nativeBalance: any;
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
            <strong>Aggregated Data</strong>
            <DisplayMultipleBalance wallets={wallets} />
            <br/><br/>
            <strong>Transaction Data</strong>
            <MultipleTransactionDetailsTable wallets={wallets} />
            </>
        );
    };

    return <div>{renderWalletData()}</div>;
};

export default DisplayMultipleWallet;
