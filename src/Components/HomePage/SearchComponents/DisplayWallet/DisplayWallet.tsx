import React, {ReactNode} from 'react';
import TruncatedText from './TruncateText';
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

const videoExtensions = /\.(mp4|webm|ogg|ogv)$/i;

const DisplayWalletData: React.FC<DisplayWalletDataProps> = ({ walletData, chain}) => {
    const renderWalletData = () => {
        return (
            <>
                <div className='address-info'>
                    <span>Address: </span>&nbsp;
                    <strong>{walletData.address}</strong>
                </div>
                <br/>
                <div>
                    <div className='address-info'>
                        <span>Balance: </span>&nbsp;
                        <strong>
                        {walletData.nativeBalance.balance_formatted}&nbsp;
                        <span style={{ color: "#EB5763"}}>{chain.label}</span>
                        </strong>
                    </div>
                </div>
                <br/>
                <div>
                    <span style={{ fontWeight: 'bold' }}>NFTs:</span>
                    <ul className="nft-container">
                        {walletData.nft.map((obj:any, index:string) =>(
                            <div key={index} className="nft-item">
                                <div className='text-container'>
                                    <span className='large-text'>{obj.name}</span>
                                    <span className='small-text'>Amount: {obj.amount}</span>
                                </div>
                                {obj.image ? (
                                    obj.image.startsWith('ipfs://') ? (
                                        <img src={`https://ipfs.io/ipfs/${obj.image.slice(7)}`} alt={obj.name} className="nft-image"/>
                                    ) : (
                                        videoExtensions.test(obj.image) ? (
                                            <video controls className="nft-video">
                                                <source src={obj.image} type={`video/${obj.image.split('.').pop()}`} />
                                                Your browser does not support the video.
                                            </video>
                                        ) : (
                                            <img src={obj.image} alt={obj.name} className="nft-image"/>
                                        )
                                    )
                                ) : (
                                    <p>Image not available</p>
                                )}
                                {obj.description ? (
                                    <span>
                                        <TruncatedText text={`Description: ${obj.description}`} maxLength={30}/>
                                    </span>
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
