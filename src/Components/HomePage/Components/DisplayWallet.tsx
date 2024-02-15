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
                        {Object.entries(walletData.activeChainsSimplified).map(([key, value]) => (
                            <li key={key}>{key}: {Array.isArray(value) ? 
                                (value as ReactNode[]).map((item: ReactNode, index: number) => (
                                    <div key={index}>{item}</div>
                                )) :
                                value as ReactNode}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <span style={{ fontWeight: 'bold' }}>Native Balance:</span> 
                    <ul>
                        {Object.entries(walletData.nativeBalance).map(([key, value]) => (
                            <li key={key}>{key}: {Array.isArray(value) ? 
                                (value as ReactNode[]).map((item: ReactNode, index: number) => (
                                    <div key={index}>{item}</div>
                                )) :
                                value as ReactNode}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <span style={{ fontWeight: 'bold' }}>NFTs:</span>
                    <ul>
                        {Object.entries(walletData.nft).map(([key, value]) => (
                            <li key={key}>{key}: {Array.isArray(value) ? 
                                (value as ReactNode[]).map((item: ReactNode, index: number) => (
                                    <div key={index}>{item}</div>
                                )) :
                                value as ReactNode}</li>
                        ))}
                    </ul> 
                </div>
                <div>
                    <span style={{ fontWeight: 'bold' }}>Token Balance:</span>
                    <ul>
                        {Object.entries(walletData.tokenBalance).map(([key, value]) => (
                            <li key={key}>{key}: {Array.isArray(value) ? 
                                (value as ReactNode[]).map((item: ReactNode, index: number) => (
                                    <div key={index}>{item}</div>
                                )) :
                                value as ReactNode}</li>
                        ))}
                    </ul> 
                </div>
                <div>
                    <span style={{ fontWeight: 'bold' }}>Transaction History:</span>
                    <ul>
                        {Object.entries(walletData.transactions).map(([key, value]) => (
                            <li key={key}>{key}: {Array.isArray(value) ? 
                                (value as ReactNode[]).map((item: ReactNode, index: number) => (
                                    <div key={index}>{item}</div>
                                )) :
                                value as ReactNode}</li>
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
