import React, { useEffect, useRef, useMemo } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import "../displaywallet.css";
import { Box, Grid, Stack, Typography } from "@mui/material";
import BoxWrapper from "../../../HomeComponents/BoxWrapper/BoxWrapper";

interface BarGraphProps {
  data: number[];
  labels: string[];
}

const BarGraph: React.FC<BarGraphProps> = ({ data, labels }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart>();

  const chartConfig = useMemo<ChartConfiguration>(
    () => ({
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            backgroundColor: "#74B9B1",
            borderColor: "#74B9B1",
            borderWidth: 2,
            maxBarThickness: 55,
          },
        ],
      },
      options: {
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
            ticks: {
              color: "#8C8C8C", // Set y-axis text color to black
            },
            grid: {
              color: "#8C8C8C",
            },
            title: {
              display: true,
              text: "Number of Token",
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
    []
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
  }, [data, labels, chartConfig]);

  // Filter out subsequent labels with corresponding values of 0
  const filteredData = data
    .map((value, index) => (index === 0 || value !== 0 ? value : null))
    .filter((value) => value !== null);
  const filteredLabels = labels
    .map((label, index) => (index === 0 || data[index] !== 0 ? label : null))
    .filter((label) => label !== null);

  // Combine filtered data and labels into an array of objects
  const combinedData = filteredData.map((value, index) => ({
    value,
    label: filteredLabels[index],
  }));

  // Separate the first data and labels
  const firstData = combinedData.slice(0, 1);
  const firstLabels = firstData.map((item) => item.label);

  // Sort the rest of the combined data and labels by value in descending order
  const restData = combinedData
    .slice(1)
    .sort((a, b) => (b.value || 0) - (a.value || 0));
  const restLabels = restData.map((item) => item.label);

  // Combine the sorted rest of the data with the first data
  const sortedData = firstData.concat(restData).map((item) => item.value || 0);
  const sortedLabels = firstLabels.concat(restLabels);

  // Update chartConfig with the sorted data and labels
  chartConfig.data.labels = sortedLabels;
  chartConfig.data.datasets[0].data = sortedData;

  return (
    <Grid item xs={12}>
      <BoxWrapper
        title="Most Popular Five Token"
        titleSX={{ textAlign: "center" }}
      >
        <Grid container item mt={3} mb={3}>
          {combinedData.slice(0, 5).map((token, index) => (
            <Grid item xs={2.4} key={index} spacing={3} display="flex">
              <Stack spacing={1}>
                <Typography variant="subtitle1" color="white">
                  {token.label}
                </Typography>
                <Typography variant="subtitle2" color="#9E9E9E">
                  {token.value}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Typography variant="h6" textAlign="center" color="white">
          Token Balances
        </Typography>
        <Box maxHeight={300} mt={3}>
          <canvas
            ref={chartRef}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Box>
      </BoxWrapper>
    </Grid>
  );
};

export default BarGraph;
