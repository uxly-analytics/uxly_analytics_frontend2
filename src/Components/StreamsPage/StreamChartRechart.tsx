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
  AreaChart,
  Area,
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
    const blockNumber = payload[0].payload.blockNumber || 'N/A';
    const time = payload[0].payload.time || 'N/A';

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
        <p>{`Block Number: ${blockNumber}`}</p>
        <p>{`Time: ${time}`}</p>
        <p
          style={{
            color: '#1890FF',
          }}
        >{`Total Transfer: ${value} USDT`}</p>
        <p
          style={{
            color: '#82ca9d',
          }}
        >{`Average Transfer: ${averageValue} USDT`}</p>
      </div>
    );
  }

  return null;
};

const BarChartComponent = ({ data }: ChartComponentProps) => (
  <ResponsiveContainer width="95%" height="100%">
    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      {/* <CartesianGrid strokeDasharray="1 1" /> */}
      <XAxis
        dataKey="hourAndMinute"
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
      <Bar dataKey="totalValue" fill="#1890FF" name="Total USDT Transfer" />
      <Bar dataKey="averageValue" fill="#82ca9d" name="Average USDT Transfer" />
    </BarChart>
  </ResponsiveContainer>
);

const LineChartComponent = ({ data }: ChartComponentProps) => (
  <ResponsiveContainer width="95%" height="100%">
    <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#1890FF" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#1890FF" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis
        dataKey="hourAndMinute"
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
      <Area
        type="monotone"
        dataKey="totalValue"
        stroke="#1890FF"
        fillOpacity={1}
        fill="url(#colorUv)"
        name="Total USDT Transfer"
      />
      <Area
        type="monotone"
        dataKey="averageValue"
        stroke="#82ca9d"
        fill="#82ca9d"
        name="Average USDT Transfer"
      />
    </AreaChart>
  </ResponsiveContainer>
);

export function StreamChartRechartBar({ data }: ChartComponentProps) {
  return (
    <div
      className="App"
      style={{ width: '90%', height: '400px', margin: 'auto' }}
    >
      <BarChartComponent data={data} />
    </div>
  );
}

export function StreamChartRechartLine({ data }: ChartComponentProps) {
  return (
    <div
      className="App"
      style={{ width: '90%', height: '400px', margin: 'auto' }}
    >
      <LineChartComponent data={data} />
    </div>
  );
}
