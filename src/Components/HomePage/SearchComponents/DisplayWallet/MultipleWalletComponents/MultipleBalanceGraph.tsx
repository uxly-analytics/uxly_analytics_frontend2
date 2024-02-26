import React, { useEffect, useRef, useMemo } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import "./displaymultiplewallet.css";

interface BalanceData {
    chain: string;
    totalBalance: number;
    median: number;
}

interface MultipleBalanceGraphProps {
    balances: BalanceData[];
}

const MultipleBalanceGraph: React.FC<MultipleBalanceGraphProps> = ({ balances }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart>();

    const chartConfig = useMemo<ChartConfiguration>(() => ({
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Total Balance',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }, {
                label: 'Median',
                data: [],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        color: 'black' // Set x-axis text color to black
                    }
                },
                y: {
                    ticks: {
                        color: 'black' // Set y-axis text color to black
                    }
                }
            },
            plugins: {
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false,
                }
            }
        }
    }), []);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                if (chartInstance.current) {
                    chartInstance.current.destroy(); // Destroy the previous chart instance
                }
                chartInstance.current = new Chart(ctx, chartConfig);
            }
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy(); // Clean up on unmount
            }
        };
    }, [balances, chartConfig]);

    // Update chart data with new balances
    useEffect(() => {
        if (chartInstance.current) {
            // Filter out chains with total balance of 0, except for the first chain
            const filteredBalances = balances.filter((balance, index) => index === 0 || balance.totalBalance !== 0);
    
            // Sort filtered balances array by total balance in descending order, excluding the first chain
            const sortedBalances = [filteredBalances[0], ...filteredBalances.slice(1).sort((a, b) => b.totalBalance - a.totalBalance)];
    
            const totalBalanceData = sortedBalances.map(balance => balance.totalBalance); // Use total balance for the bar graph
            const medianData = sortedBalances.map(balance => balance.median); // Use median for the second dataset
            const labels = sortedBalances.map(balance => balance.chain); // Use chain names for labels
    
            chartInstance.current.data.datasets[0].data = totalBalanceData;
            chartInstance.current.data.datasets[1].data = medianData;
            chartInstance.current.data.labels = labels;
            chartInstance.current.update();
        }
    }, [balances]);
    
    
    
    return (
        <div className='balancemedian-graph'>
            <canvas ref={chartRef} style={{ maxWidth: '100%', maxHeight: '100%' }}/>
        </div>
    );
};

export default MultipleBalanceGraph;
