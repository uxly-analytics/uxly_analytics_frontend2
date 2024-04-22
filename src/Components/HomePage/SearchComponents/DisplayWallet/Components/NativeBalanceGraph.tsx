import React, { useEffect, useRef, useMemo, useState } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import "../displaywallet.css";
import { Box, Grid, Button } from "@mui/material";
import BoxWrapper from "../../../HomeComponents/BoxWrapper/BoxWrapper";
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

interface NativeBalanceGraphProps {
    labels: string[];
    nativeBalance: number[];
    nativeBalanceUSD: number[];
    tokenBalanceUSD: number[];
}

const NumberComponent = ({ numberString }: { numberString: string }): string => {
  const addCommasToNumberString = (numberString: string): string => {
    const number = parseFloat(numberString);
    if (!isNaN(number)) {
      return number.toLocaleString();
    } else {
      return numberString;
    }
  };

  return addCommasToNumberString(numberString);
};

const NativeBalanceGraph: React.FC<NativeBalanceGraphProps> = ({ labels, nativeBalance, nativeBalanceUSD, tokenBalanceUSD }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart>();
    const [isListView, setIsListView] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1200);
    const [key, setKey] = useState(0); // Add key state

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

    const chartConfig = useMemo<ChartConfiguration>(
        () => ({
          type: "bar",
          data: {
            labels: labels,
            datasets: [{
                label: 'Native Balance',
                data: nativeBalance,
                backgroundColor: 'rgba(255, 99, 132, 1)',
                borderColor: "white",
                borderWidth: 1
            },
            {
                label: 'Native Balance (USD)',
                data: nativeBalanceUSD,
                backgroundColor: 'rgba(255, 159, 64, 1)',
                borderColor: "white",
                borderWidth: 1
            },
            {
                label: 'Token Balance (USD)',
                data: tokenBalanceUSD,
                backgroundColor: 'rgba(54, 162, 235, 1)',
                borderColor: "white",
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
                    return value.toLocaleString(); // Format ticks
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
          },
        }),
        [labels, nativeBalance, nativeBalanceUSD, tokenBalanceUSD]
      );

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
        const ctx = chartRef.current.getContext("2d");
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
    }, [nativeBalance, nativeBalanceUSD, tokenBalanceUSD, labels, chartConfig, key]);

    const toggleView = () => {
      setIsListView((prev) => !prev);
      setKey((prevKey) => prevKey + 1); // Update key to force re-render
    };

    return (
        <Grid item xs={12}>
            <BoxWrapper
                title="Chain Networth Details"
                titleSX={{ textAlign: "center" }}
            >
            <Button onClick={toggleView} style={{ position: "relative", width: "150px", color: "#da6167"}}>
              {isListView ? "Graph View" : "List View"} {/* Toggle button text based on view */}
            </Button>
            {isListView ? (
              <Box minHeight={400} maxHeight={1000} mt={3}>
                <Grid container spacing={3}>
                  {labels.map((chain, index) => (
                    <Grid item xs={6} key={index} style={{ color: 'white', fontSize: '1.2rem', }}>
                      <img src={logos[index]} alt={`Logo ${index}`} style={{ maxWidth: "30px", maxHeight: "30px", marginRight: "10px" }} />
                      {chain}: <br />
                      Native Balance: {nativeBalance[index]}<br />
                      Native Balance (USD): {`$${NumberComponent({ numberString: `${nativeBalanceUSD[index]}` })}`}<br />
                      Token Balance (USD): {`$${NumberComponent({ numberString: `${tokenBalanceUSD[index]}` })}`}<br />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (
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
            )}
            </BoxWrapper>
        </Grid>
    );
}

export default NativeBalanceGraph;
