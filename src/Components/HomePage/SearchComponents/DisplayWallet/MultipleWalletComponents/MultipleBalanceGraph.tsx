import React, { useEffect, useRef, useMemo, useState } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import { Box, Grid } from "@mui/material";
import BoxWrapper from '../../../../HomePage/HomeComponents/BoxWrapper/BoxWrapper';
import "./displaymultiplewallet.css";
import EthLogo from "../../Icons/eth-logo.png";
import PolygonLogo from "../../Icons/polygon-logo.png";
import BscLogo from "../../Icons/bsc-logo.png";
import AvalancheLogo from "../../Icons/avalanche-logo.png";
import FantomLogo from "../../Icons/fantom-logo.png";
import CronosLogo from "../../Icons/cronos-logo.png";
import ArbitrumLogo from "../../Icons/arbitrum-logo.png";
import GnosisLogo from "../../Icons/gnosis-logo.png";
import BaseLogo from "../../Icons/base-logo.png";
import OptimismLogo from "../../Icons/optimism-logo.png";

interface WalletData {
    networth: {
        chains: ChainNetWorth[];
    };
}

interface ChainNetWorth {
    chain: string;
    networth_usd: string;
}

interface DisplayMultipleNetworthProps {
    wallets: WalletData[];
}

const MultipleBalanceGraph: React.FC<DisplayMultipleNetworthProps> = ({ wallets }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart>();

    const chainsNetworth: Record<string, number> = {};
    const chainsCounts: Record<string, number> = {};

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1200);
    const logos = [
        EthLogo,
        PolygonLogo,
        BscLogo,
        AvalancheLogo,
        FantomLogo,
        CronosLogo,
        ArbitrumLogo,
        GnosisLogo,
        BaseLogo,
        OptimismLogo,
      ];

    // Calculate total networth_usd per chain
    wallets.forEach(wallet => {
        wallet.networth.chains.forEach(chain => {
            if (!chainsNetworth[chain.chain]) {
                chainsNetworth[chain.chain] = 0;
                chainsCounts[chain.chain] = 0;
            }
            chainsNetworth[chain.chain] += parseFloat(chain.networth_usd);
            chainsCounts[chain.chain]++;
        });
    });

    const labels = Object.keys(chainsNetworth);
    const data = Object.values(chainsNetworth);
    const medians: Record<string, number> = {};

    // Calculate median for each chain
    Object.keys(chainsNetworth).forEach(chain => {
        const values = Array.from({ length: chainsCounts[chain] }, (_, i) => parseFloat(wallets[i].networth.chains.find(c => c.chain === chain)?.networth_usd || '0'));
        values.sort((a, b) => a - b);
        const middle = Math.floor(values.length / 2);
        if (values.length % 2 === 0) {
            medians[chain] = (values[middle - 1] + values[middle]) / 2;
        } else {
            medians[chain] = values[middle];
        }
    });

    const medianData = labels.map(label => medians[label]);

    const chartConfig = useMemo<ChartConfiguration>(() => ({
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Networth (USD)',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 1)',
                borderColor: 'white',
                borderWidth: 1
            }, {
                label: 'Median (USD)',
                data: medianData,
                backgroundColor: 'rgba(153, 102, 255, 1)',
                borderColor: 'white',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    ticks: {
                      color: "white", // Set x-axis text color to black
                    },
                    grid: {
                      display: false,
                    },
                  },
                  y: {
                    type: 'logarithmic',
                    ticks: {
                      color: "white", // Set y-axis text color to black
                      callback: (value: string | number) => {
                        return `$` + value.toLocaleString(); // Format ticks
                      },
                      maxTicksLimit: 14, // Adjust this number to control the number of ticks displayed
                    },
                    grid: {
                      color: "#8C8C8C",
                    },
                  },
            },
            plugins: {
                color: "white",
                tooltip: {
                  enabled: true,
                  mode: "index",
                  intersect: false,
                },
                legend: {
                  display: true,
                  labels: {
                    color: 'white',
                    fontSize: 20,
                  }
                },
              },
        }
    }), [labels, data, medianData]);

    useEffect(() => {
        const handleResize = () => {
          setIsSmallScreen(window.innerWidth < 1200);
        };
    
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

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
    }, [chartConfig]);

    return (
        <Grid item xs={12}>
            <BoxWrapper
                title="Networth Across Chains"
                titleSX={{ textAlign: "center" }}
            >
                <Box minHeight={400} maxHeight={800} mt={3}>
                <canvas
                    ref={chartRef}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
                {!isSmallScreen && (
                    <Grid container spacing={3} className="balance-graph-icons">
                    {logos.map((logo, index) => (
                        <Grid item key={index}>
                        <img src={logo} alt={`Logo ${index}`} style={{ maxWidth: "20px", maxHeight: "20px", marginRight: "60px" }} />
                        </Grid>
                    ))}
                    </Grid>
                    )}
                </Box>
            </BoxWrapper>
        </Grid>
    );
};

export default MultipleBalanceGraph;
