import React from 'react';

const WeatherSummary = ({ weatherData }) => {
    return (
        <div>
            {weatherData.map((cityData, index) => (
                <div key={index}>
                    <h2>{cityData.name} - {new Date(cityData.dt * 1000).toDateString()}</h2>
                    <p>Avg Temperature: {cityData.main.temp.toFixed(2)}°C</p>
                    <p>Feels Like: {cityData.main.feels_like.toFixed(2)}°C</p>
                    <p>Max Temperature: {cityData.main.temp_max.toFixed(2)}°C</p>
                    <p>Min Temperature: {cityData.main.temp_min.toFixed(2)}°C</p>
                    <p>Dominant Condition: {cityData.weather[0].main}</p>
                </div>
            ))}
        </div>
    );
};

export default WeatherSummary;