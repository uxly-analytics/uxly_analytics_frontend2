import React from 'react';
import MultipleBalanceGraph from './MultipleBalanceGraph';
import "./displaymultiplewallet.css";

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

const DisplayMultipleBalance: React.FC<{wallets: WalletData[]}> = ({wallets}) => {
    const chainBalancesMap: { [key: string]: number[] } = {};
    // Collect balances for each chain
    wallets.forEach(wallet => {
        wallet.nativeBalance.forEach((chainBalance: ChainBalance) => {
            const { chain, balance } = chainBalance;
            const parsedBalance = parseFloat(balance);
            if (!chainBalancesMap[chain]) {
                chainBalancesMap[chain] = [];
            }
            chainBalancesMap[chain].push(parsedBalance);
        });
    });
    // Calculate median and total balance for each chain
    const medianAndTotalBalances: { chain: string; median: number; totalBalance: number }[] = [];
    for (const chain in chainBalancesMap) {
        if (chainBalancesMap.hasOwnProperty(chain)) {
            const balances = chainBalancesMap[chain];
            balances.sort((a, b) => a - b);
            let median: number;
            let totalBalance: number = 0;
            balances.forEach(balance => totalBalance += balance);
            const mid = Math.floor(balances.length / 2);
            if (balances.length % 2 === 0) {
                median = (balances[mid - 1] + balances[mid]) / 2;
            } else {
                median = balances[mid];
            }
            medianAndTotalBalances.push({ chain, median, totalBalance });
        }
    }
    return(
        <div className="centered-content">
            <MultipleBalanceGraph balances={medianAndTotalBalances}/>
        </div>
    );
};

export default DisplayMultipleBalance;
