import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register components once globally
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const WeatherChart = ({ trends, city }) => {
    const data = {
        labels: trends.map((trend) => trend.date), // Adjust based on your data
        datasets: [
            {
                label: `Temperature in ${city}`,
                data: trends.map((trend) => trend.avgTemp), // Adjust based on your data
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Weather Trends in ${city}`,
            },
        },
        scales: {
            x: {
                type: 'category', // Ensures that the x-axis is categorical
            },
            y: {
                beginAtZero: true, // Adjust based on your data
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default WeatherChart;