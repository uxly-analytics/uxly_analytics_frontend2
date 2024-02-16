import React, { ReactNode } from 'react';


interface WalletData {
    address: string;
    activeChainsSimplified: any;
    nativeBalance: any;
    nft: any;
    tokenBalance: any;
    transactions: any;
}

const DisplayWalletData: React.FC<{ walletData: WalletData }> = ({ walletData }) => {
    const renderWalletData = () => {
        return (
            <>
                <div>
                    <span style={{ fontWeight: 'bold' }}>Address:</span> {walletData.address}
                </div>
                <div>
                    <span style={{ fontWeight: 'bold' }}>Active Chains:</span> 
                    <ul>
                        {walletData.activeChainsSimplified.map((item: any, index: number) => (
                            <li key={index}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <span style={{ fontWeight: 'bold' }}>Native Balance:</span> 
                    <ul>
                        Balance Formatted: {walletData.nativeBalance.balance_formatted}
                    </ul>
                </div>
                <div>
                    <span style={{ fontWeight: 'bold' }}>NFTs:</span>
                    <ul>
                        {walletData.nft.map((obj:any, index:string) =>(
                            <div key={index}>
                                <strong>Name: {obj.name}</strong>
                                <p>Amount: {obj.amount}</p>
                                {obj.metadata && obj.metadata.image ? (
                                    <img>src={obj.metadata.image} alt={obj.name}</img>
                                ) : (
                                    <p>Image not available</p>
                                )}
                                {obj.metadata && obj.metadata.description ? (
                                    <p>Description: {obj.metadata.description}</p> 
                                ) : (
                                    <p>No Description available</p>
                                )}
                            </div>
                        ))}
                    </ul> 
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
