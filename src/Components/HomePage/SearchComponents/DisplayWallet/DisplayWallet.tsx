import React from "react";
import DisplayBalance from "./Components/DisplayBalance";
import DisplayNFTs from "./Components/DisplayNFTs";
import "./displaywallet.css";

interface WalletData {
  address: string;
  activeChainsSimplified: any;
  nativeBalance: any;
  nft: any;
  tokenBalance: any;
  transactions: any;
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
        <div>
          <span style={{ fontWeight: "bold" }}>Transaction History:</span>
          <ul>
            {walletData.transactions &&
              Array.isArray(walletData.transactions) &&
              walletData.transactions.map((transaction, index) => (
                <li key={index}>
                  <div>Timestamp: {transaction.block_timestamp}</div>
                  <div>Value: {transaction.value}</div>
                  <div>Decimal Value: {transaction.decimal_value}</div>
                  <div>To: {transaction.to_address}</div>
                  <div>From: {transaction.from_address}</div>
                </li>
              ))}
          </ul>
        </div>
      </>
    );
  };

  return <div>{renderWalletData()}</div>;
};

export default DisplayWalletData;
