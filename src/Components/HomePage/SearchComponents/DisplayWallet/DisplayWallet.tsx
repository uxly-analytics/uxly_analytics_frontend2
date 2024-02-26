import React from "react";
import DisplayBalance from "./Components/DisplayBalance";
import DisplayNFTs from "./Components/DisplayNFTs";
import TransactionDetailsTable from "./Components/TransactionDetailsTable";
import TransactionTable from "./Components/TransactionTable";
import "./displaywallet.css";

interface WalletData {
  address: string;
  activeChainsSimplified: any;
  nativeBalance: any;
  nft: any;
  tokenBalance: any;
  transactions: any;
  transactionsData: any;
}

interface DisplayWalletDataProps {
  walletData: WalletData;
  chain: { value: string; label: string };
}

const DisplayWalletData: React.FC<DisplayWalletDataProps> = ({
  walletData,
  chain,
}) => {
  console.log("Wallet data is:", walletData);
  console.log("Tokens are:", walletData.tokenBalance);
  const renderWalletData = () => {
    return (
      <>
        <div className="address-info">
          <strong>{walletData.address}'s Data</strong>
        </div>
        <br />
        <DisplayBalance walletData={walletData} />
        <br />
        <div>
          <span style={{ fontWeight: "bold" }}>Transaction History:</span>
          <br />
          <br />
          <TransactionTable walletData={walletData} />
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}>
            Transaction Details (last 100)
          </span>
          <br />
          <br />
          <TransactionDetailsTable walletData={walletData} />
        </div>
        <div>
          <DisplayNFTs walletData={walletData} />
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}>Token Balance:</span>
          <ul>
            {walletData.tokenBalance &&
              Array.isArray(walletData.tokenBalance) &&
              walletData.tokenBalance.map((item: any, index: number) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
        </div>
      </>
    );
  };

  return <div>{renderWalletData()}</div>;
};

export default DisplayWalletData;
