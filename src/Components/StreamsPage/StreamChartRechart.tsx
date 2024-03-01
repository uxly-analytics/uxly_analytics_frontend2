import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  TooltipProps,
} from 'recharts';

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

interface CustomTooltipProps extends TooltipProps<number, string> {}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const value =
      typeof data.totalValue === 'number' ? data.totalValue.toFixed(2) : 'N/A';
    const averageValue = payload[0].payload.averageValue?.toFixed(2) || 'N/A';

    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: '#fff',
          padding: '5px 10px', // Smaller top and bottom padding
          border: '1px solid #ccc',
          fontSize: '14px', // Smaller font size
        }}
      >
        <p>{`Block Number: ${label}`}</p>
        <p>{`Total Transfer: ${value}`}</p>
        <p>{`Average Transfer: ${averageValue}`}</p>
      </div>
    );
  }

  return null;
};

const BarChartComponent = ({ data }: ChartComponentProps) => (
  <ResponsiveContainer width="95%" height="100%">
    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="blockNumber"
        angle={-45}
        textAnchor="end"
        height={70}
        fontSize="13px"
      />
      <YAxis
        fontSize="14px"
        type="number"
        domain={['auto', 'auto']}
        allowDataOverflow={true}
        tickCount={10}
        tickFormatter={(value) => `${value / 1e6}M`}
      />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Bar dataKey="totalValue" fill="#8884d8" name="Total USDT Transfer" />
      <Bar dataKey="averageValue" fill="#82ca9d" name="Average USDT Transfer" />
    </BarChart>
  </ResponsiveContainer>
);

const LineChartComponent = ({ data }: ChartComponentProps) => (
  <ResponsiveContainer width="95%" height="100%">
    <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="blockNumber"
        angle={-45}
        textAnchor="end"
        height={70}
        fontSize="13px"
      />
      <YAxis
        fontSize="14px"
        type="number"
        domain={['auto', 'auto']}
        allowDataOverflow={true}
        tickCount={10}
        tickFormatter={(value) => `${value / 1e6}M`}
      />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="totalValue"
        stroke="#8884d8"
        name="Total USDT Transfer"
      />
      <Line
        type="monotone"
        dataKey="averageValue"
        stroke="#82ca9d"
        name="Average USDT Transfer"
      />
    </LineChart>
  </ResponsiveContainer>
);

function StreamChartRechart({ data }: ChartComponentProps) {
  return (
    <div
      className="App"
      style={{ width: '95%', height: '400px', margin: 'auto' }}
    >
      <h2>Bar Chart</h2>
      <BarChartComponent data={data} />
      <h2>Line Chart</h2>
      <LineChartComponent data={data} />
    </div>
  );
}

export default StreamChartRechart;
