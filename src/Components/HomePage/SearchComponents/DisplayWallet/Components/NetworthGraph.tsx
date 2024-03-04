import React, { useEffect, useRef, useMemo } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import "../displaywallet.css";
import { Box, Grid } from "@mui/material";
import BoxWrapper from "../../../HomeComponents/BoxWrapper/BoxWrapper";

interface NetworthProps {
  labels: string[];
  chainNetWorth: number[];
}

const NetworthGraph: React.FC<NetworthProps> = ({ labels, chainNetWorth }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart>();

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
            borderColor: "#74B9B1",
            borderWidth: 2,
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
              color: "#8C8C8C", // Set y-axis text color to black
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
  }, [chainNetWorth, labels, chartConfig]);

  return (
    <Grid item xs={12}>
      <BoxWrapper
        title="Wallet Networth by Chain (USD)"
        titleSX={{ textAlign: "center" }}
      >
        <Box maxHeight={400} mt={3}>
          <canvas
            ref={chartRef}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Box>
      </BoxWrapper>
    </Grid>
  );
};

export default NetworthGraph;
