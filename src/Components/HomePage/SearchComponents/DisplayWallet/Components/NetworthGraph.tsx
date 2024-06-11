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

interface NetworthProps {
  labels: string[];
  chainNetWorth: number[];
  total: string;
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

const NetworthGraph: React.FC<NetworthProps> = ({ labels, chainNetWorth, total }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart>();
  const [isListView, setIsListView] = useState(false);
  const totalNetworth = NumberComponent({numberString: total});
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
        datasets: [
          {
            label: "",
            data: chainNetWorth,
            backgroundColor: "#74B9B1",
            borderColor: "white",
            borderWidth: 1,
            maxBarThickness: 55,
          },
        ],
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
                return '$' + value.toLocaleString(); // Format ticks as currency
              },
              maxTicksLimit: 14, // Adjust this number to control the number of ticks displayed
            },
            grid: {
              color: "#8C8C8C",
            },
            title: {
              display: true,
              text: "USD",
              color: "white",
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
            display: false,
          },
        },
      },
    }),
    [labels, chainNetWorth]
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
  }, [chainNetWorth, labels, chartConfig, key]);

  const toggleView = () => {
    setIsListView((prev) => !prev);
    setKey((prevKey) => prevKey + 1); // Update key to force re-render
  };

  return (
    <Grid item xs={12}>
      <br/>
      <BoxWrapper
        title="Networth by Chain (USD)"
        titleSX={{ textAlign: "center" , fontSize: '30px'}}
      >
        <Button onClick={toggleView} style={{ fontSize: '20px', marginTop: '-50px', position: "relative", width: "150px", color: "#d87378"}}>
          {isListView ? "Graph View" : "List View"} {/* Toggle button text based on view */}
        </Button>
        {isListView ? (
          <Box minHeight={400} maxHeight={600} mt={3}>
            <Grid container spacing={3}>
              {labels.map((label, index) => (
                <Grid item xs={6} key={index} style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={logos[index]} alt={`Logo ${index}`} style={{ maxWidth: "20px", maxHeight: "20px", marginRight: "10px" }} />
                  <div style={{ color: 'white', fontSize: '2rem' }}>
                    {label} : {`$${NumberComponent({ numberString: `${chainNetWorth[index]}` })}`}
                  </div>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box minHeight={400} maxHeight={500} mt={3}>
            <canvas
              ref={chartRef}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
            {!isSmallScreen && (
              <Grid container spacing={4} className="balance-graph-icons">
              {logos.map((logo, index) => (
                <Grid item key={index}>
                  <img src={logo} alt={`Logo ${index}`} style={{ maxWidth: "20px", maxHeight: "20px", marginRight: "50px" }} />
                </Grid>
              ))}
            </Grid>
            )}
          </Box>
        )}
      </BoxWrapper>
    </Grid>
  );
};

export default NetworthGraph;
