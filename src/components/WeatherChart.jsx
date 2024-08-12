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
    // Prepare the data for the chart
    const data = {
        labels: trends.map((trend) => trend.date), // Dates on the x-axis
        datasets: [
            {
                label: `Average Temperature in ${city}`, // Chart label
                data: trends.map((trend) => trend.avgTemp), // Daily average temperatures
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                fill: true, // Fill under the line
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
                text: `Daily Average Temperature in ${city}`,
            },
        },
        scales: {
            x: {
                type: 'category', // Ensure that the x-axis is categorical
                title: {
                    display: true,
                    text: 'Date', // X-axis label
                },
            },
            y: {
                beginAtZero: false, // Adjust based on your data
                title: {
                    display: true,
                    text: 'Average Temperature (°C)', // Y-axis label
                },
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default WeatherChart;