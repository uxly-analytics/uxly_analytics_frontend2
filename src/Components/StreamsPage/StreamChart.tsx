import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';

interface ChartComponentProps {
  data: {
    totalValue: number;
    averageValue: number;
    tokenName: string;
    tokenSymbol: string;
    blockNumber: string;
    blockTimestamp: string;
  }[];
}

const ChartComponent = ({ data }: ChartComponentProps) => {
  const chartData = {
    labels: data.map((item) => `Block ${item.blockNumber}`),
    datasets: [
      {
        label: 'Total USDT Transfers',
        data: data.map((item) => item.totalValue),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Average USDT Transfers',
        data: data.map((item) => item.averageValue),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Total and Average USDT Transfers per Block Number',
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <h2>Bar Chart</h2>
      <Bar data={chartData} options={options} width={'100%'} />

      <h2>Line Chart</h2>
      <Line data={chartData} options={options} width={'100%'} />
    </div>
  );
};

export default ChartComponent;
