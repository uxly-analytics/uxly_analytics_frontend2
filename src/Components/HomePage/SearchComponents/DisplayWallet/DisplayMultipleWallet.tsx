import React from "react";
import DisplayMultipleBalance from "./MultipleWalletComponents/DisplayMultipleBalance";

interface WalletData {
    address: string;
    activeChainsSimplified: any;
    nativeBalance: any;
    nft: any;
    tokenBalance: any;
    transactions: any;
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
            </>
        );
    };

    return <div>{renderWalletData()}</div>;
};

export default DisplayMultipleWallet;
