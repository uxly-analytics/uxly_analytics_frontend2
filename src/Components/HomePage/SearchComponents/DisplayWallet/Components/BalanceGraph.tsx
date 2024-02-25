import React, { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import "../displaywallet.css";

interface BarGraphProps {
    data: number[];
    labels: string[];
}

const BarGraph: React.FC<BarGraphProps> = ({ data, labels }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart>();

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
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
    }, [data, labels]);

    const chartConfig: ChartConfiguration = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Balance',
                data: data,
                backgroundColor: 'rgba(131, 182, 176, 0.6)',
                borderColor: 'rgba(131, 182, 176, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    return (
        <div className='bar-graph'>
            <canvas ref={chartRef} style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>
    );
};

export default BarGraph;
