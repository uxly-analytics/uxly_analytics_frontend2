import React, { useEffect, useRef, useMemo } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import "../displaywallet.css";
import { Box, Grid } from "@mui/material";
import BoxWrapper from "../../../HomeComponents/BoxWrapper/BoxWrapper";

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
  const totalNetworth = NumberComponent({numberString: total});

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
      <Grid item xs={6}>
        <BoxWrapper
          title = {"Wallet Value:"}
          titleSX={{ textAlign: "center" }} 
          value = {`$${totalNetworth}`}
        />
      </Grid>
      <br/>
      <BoxWrapper
        title="Networth by Chain (USD)"
        titleSX={{ textAlign: "center" }}
      >
        <Box  minHeight={400} maxHeight={500} mt={3}>
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
