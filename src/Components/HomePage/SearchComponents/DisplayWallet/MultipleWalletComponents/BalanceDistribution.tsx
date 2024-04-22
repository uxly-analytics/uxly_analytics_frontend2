import React, { useEffect, useRef } from 'react';
import { Box, Grid } from '@mui/material';
import BoxWrapper from '../../../../HomePage/HomeComponents/BoxWrapper/BoxWrapper';
import Chart from 'chart.js/auto';
import './displaymultiplewallet.css';

interface WalletData {
    networth: {
        chains: ChainNetWorth[];
    };
}

interface ChainNetWorth {
    chain: string;
    networth_usd: string;
    native_balance_formatted: string;
}

interface BalanceRange {
    '< 0.5': number;
    '0.5-2': number;
    '2-10': number;
    '10-100': number;
    '100-1000': number;
    '1000<=': number;
}

interface TopChain extends ChainNetWorth {
    balanceRanges: BalanceRange;
}

interface BalanceDistributionProps {
    wallets: WalletData[];
}

const BalanceDistribution: React.FC<BalanceDistributionProps> = ({ wallets }) => {
    const chartRefs = useRef<Record<string, Chart | null>>({});

    useEffect(() => {
        const destroyCharts = () => {
            Object.values(chartRefs.current).forEach(chart => {
                if (chart) {
                    chart.destroy();
                }
            });
        };

        destroyCharts();

        const chainsNetworth: Record<string, number> = {};

        // Calculate total net worth for each chain
        wallets.forEach(wallet => {
            wallet.networth.chains.forEach(chain => {
                const networth = parseFloat(chain.networth_usd);
                if (!isNaN(networth)) {
                    chainsNetworth[chain.chain] = (chainsNetworth[chain.chain] || 0) + networth;
                }
            });
        });

        // Sort chains based on total net worth
        const topChains: TopChain[] = Object.keys(chainsNetworth)
            .map(chain => ({
                chain,
                networth_usd: chainsNetworth[chain].toString(),
                balanceRanges: {
                    '< 0.5': 0,
                    '0.5-2': 0,
                    '2-10': 0,
                    '10-100': 0,
                    '100-1000': 0,
                    '1000<=': 0,
                },
                native_balance_formatted: '', // Added to fix the error
            }))
            .sort((a, b) => parseFloat(b.networth_usd) - parseFloat(a.networth_usd))
            .slice(0, 4);

        // Calculate balance ranges for each chain
        topChains.forEach(chain => {
            wallets.forEach(wallet => {
                wallet.networth.chains.forEach(chainData => {
                    if (chainData.chain === chain.chain) {
                        const balance = parseFloat(chainData.native_balance_formatted);
                        if (balance < 0.5) {
                            chain.balanceRanges['< 0.5']++;
                        } else if (balance >= 0.5 && balance < 2) {
                            chain.balanceRanges['0.5-2']++;
                        } else if (balance >= 2 && balance < 10) {
                            chain.balanceRanges['2-10']++;
                        } else if (balance >= 10 && balance < 100) {
                            chain.balanceRanges['10-100']++;
                        } else if (balance >= 100 && balance < 1000) {
                            chain.balanceRanges['100-1000']++;
                        } else {
                            chain.balanceRanges['1000<=']++;
                        }
                    }
                });
            });
        });

        // Render charts for top chains
        topChains.forEach((chain, index) => {
            const canvas = document.getElementById(`chain${index + 1}-graph`) as HTMLCanvasElement;

            if (canvas) {
                chartRefs.current[chain.chain] = new Chart(canvas, {
                    type: 'bar',
                    data: {
                        labels: Object.keys(chain.balanceRanges),
                        datasets: [
                            {
                                label: `${chain.chain} Balance Distribution`,
                                data: Object.values(chain.balanceRanges),
                                backgroundColor: 'rgba(75, 192, 192, 1)',
                                borderColor: 'white',
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    color: "white",
                                    stepSize: 2,
                                },
                                title: {
                                  display: true,
                                  text: "Users",
                                  color: "white",
                                },
                            },
                            x: {
                              ticks: {
                                color: "white",
                              }
                            },
                        },
                        plugins: {
                          tooltip: {
                            enabled: true,
                            mode: "index",
                            intersect: false,
                          },
                          legend: {
                            display: true,
                            labels: {
                                color: 'white',
                              }
                          },
                        },
                    },
                });
            }
        });

        return () => {
            destroyCharts();
        };
    }, [wallets]);

    return (
      <Grid container spacing={2} style={{marginLeft: "0px", marginTop: "10px"}}>
            {Array.from({ length: 4 }, (_, index) => (
              <Grid item xs={6} key={index}>
                <BoxWrapper
                title="Balance Distribution Stats"
                titleSX={{ textAlign: "center" }}
                >
                  <Box minHeight={300} maxHeight={800} mt={3}>
                      <canvas id={`chain${index + 1}-graph`} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                  </Box>
                </BoxWrapper>
              </Grid>
            ))}
      </Grid>
    );
};

export default BalanceDistribution;
