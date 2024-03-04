import React, { useEffect, useRef, useMemo } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import "../displaywallet.css";
import { Box, Grid } from "@mui/material";
import BoxWrapper from "../../../HomeComponents/BoxWrapper/BoxWrapper";

interface NativeBalanceGraphProps {
    labels: string[];
    nativeBalance: number[];
    nativeBalanceUSD: number[];
    tokenBalanceUSD: number[];
}

const NativeBalanceGraph: React.FC<NativeBalanceGraphProps> = ({ labels, nativeBalance, nativeBalanceUSD, tokenBalanceUSD }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart>();

    const chartConfig = useMemo<ChartConfiguration>(
        () => ({
          type: "bar",
          data: {
            labels: labels,
            datasets: [{
                label: 'Native Balance',
                data: nativeBalance,
                backgroundColor: 'rgba(255, 99, 132, 1)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Native Balance (USD)',
                data: nativeBalanceUSD,
                backgroundColor: 'rgba(255, 159, 64, 1)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            },
            {
                label: 'Token Balance (USD)',
                data: tokenBalanceUSD,
                backgroundColor: 'rgba(54, 162, 235, 1)',
                borderColor: 'rgba(54, 162, 235, 1)',
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
                  color: "#8C8C8C", // Set y-axis text color to black
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
              },
            },
          },
        }),
        [labels, nativeBalance, nativeBalanceUSD, tokenBalanceUSD]
      );

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
    }, [nativeBalance, nativeBalanceUSD, tokenBalanceUSD, labels, chartConfig]);

    return (
        <Grid item xs={12}>
            <BoxWrapper
                title="Chain Networth Details"
                titleSX={{ textAlign: "center" }}
            >
                <Box minHeight={400} maxHeight={800} mt={3}>
                <canvas
                    ref={chartRef}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
                </Box>
            </BoxWrapper>
        </Grid>
    );
}

export default NativeBalanceGraph;
