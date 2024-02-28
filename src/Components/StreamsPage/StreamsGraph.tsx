import * as React from 'react';
import { BarPlot, LinePlot, ChartContainer } from '@mui/x-charts';
import { ChartsXAxis, ChartsYAxis } from '@mui/x-charts';
 import { AllSeriesType } from '@mui/x-charts/models';

interface GraphData {
  timeRecorded: string[];
  transactionsAverages: number[];
  senders: number[];
  receivers: number[];
}

interface DisplayStreamsDataProps {
  graphData: GraphData;
}

const DisplayStreamsData: React.FC<DisplayStreamsDataProps> = ({ graphData }) => {
  const { timeRecorded, transactionsAverages, senders, receivers } = graphData;

  const series: AllSeriesType[] = [
    {
      type: 'bar',
      stack: 'Senders',
      yAxisKey: 'senders',
      data: senders,
    },
    {
      type: 'bar',
      stack: 'Receivers',
      yAxisKey: 'receivers',
      data: receivers,
    },
    {
      type: 'line',
      yAxisKey: 'transactions',
      color: 'red',
      data: transactionsAverages,
    }
  ];

  return (
    <ChartContainer
      series={series}
      width={500}
      height={400}
      xAxis={[
        {
          id: 'time',
          scaleType: 'band',
          valueFormatter: (value: any) => value.toString(),
        },
      ]}
      yAxis={[
        {
          id: 'senders',
          scaleType: 'linear',
          position: 'left',
          label: 'Senders',
        },
        {
          id: 'receivers',
          scaleType: 'linear',
          position: 'right',
          label: 'Receivers',
        },
        {
          id: 'transactions',
          scaleType: 'linear',
          position: 'right',
          label: 'Transaction Averages',
        },
      ]}
    >
      <BarPlot />
      <LinePlot />
      <ChartsXAxis label="Time" position="bottom" axisId="time" />
      <ChartsYAxis label="Senders" position="left" axisId="senders" />
      <ChartsYAxis label="Receivers" position="right" axisId="receivers" />
      <ChartsYAxis label="Transaction Averages" position="right" axisId="transactions" />
    </ChartContainer>
  );
};

export default DisplayStreamsData;
