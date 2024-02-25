import React from 'react';
import BalanceGraph from './Components/BalanceGraph';
import DisplayNFTs from './Components/DisplayNFTs';
import "./displaywallet.css";

interface WalletData {
    address: string;
    activeChainsSimplified: any;
    nativeBalance: any;
    nft: any;
    tokenBalance: any;
    transactions: any;
}

interface ChainBalance{
    chain:string;
    balance:string;
}

interface DisplayWalletDataProps {
    walletData: WalletData;
    chain: { value: string; label: string };
}

const DisplayWalletData: React.FC<DisplayWalletDataProps> = ({ walletData, chain}) => {
    const labels: string[] = walletData.nativeBalance.map((obj:ChainBalance) => obj.chain);
    const balances: number[] = walletData.nativeBalance.map((obj:ChainBalance) => parseFloat(obj.balance));
    const renderWalletData = () => {
        return (
            <>
                <div className='address-info'>
                    <strong>{walletData.address}'s Data</strong>
                </div>
                <br/>
                    <div className='centered'>
                        <BalanceGraph data={balances} labels={labels} />
                    </div>
                <br/>
                <div>
                    <DisplayNFTs walletData={walletData}/>
                </div>
                <div>
                    <span style={{ fontWeight: 'bold' }}>Token Balance:</span>
                    <ul>
                        {walletData.tokenBalance.map((item: any, index: number) => (
                            <li key={index}>
                                {item}
                            </li>
                        ))}
                    </ul> 
                </div>
                <div>
                    <span style={{ fontWeight: 'bold' }}>Transaction History:</span>
                        <ul>
                            {walletData.transactions.map((item: any, index: number) => (
                                <li key={index}>
                                <ul>
                                    {Object.keys(item).map((key: string) => (
                                    <li key={key}>
                                        <strong>{key}:</strong> {typeof item[key] === 'object' ? JSON.stringify(item[key]) : item[key]}
                                    </li>
                                    ))}
                                </ul>
                                </li>
                            ))}
                        </ul>
                </div>
            </>
        );
    };

    return (
        <div>
            {renderWalletData()}
        </div>
    );
};

export default DisplayWalletData;