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
    const dates = Object.keys(trends);
    // console.log(trends)
    const data = {
        labels: dates,
        datasets: [
            {
                label: `Avg Temperature in ${city}`,
                data: dates.map(date => trends[date].avgMaxTemp),
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill: false,
            },
            {
                label: `Min Temperature in ${city}`,
                data: dates.map(date => trends[date].avgMinTemp),
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                fill: false,
            },
            {
                label: `Average Temprature in ${city}`,
                data: dates.map(date => trends[date].avgTemp),
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
                beginAtZero: false, // Adjust based on your data
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default WeatherChart;