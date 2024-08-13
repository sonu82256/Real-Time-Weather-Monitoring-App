import React from 'react';

const WeatherCard = ({ cityData }) => {
    return (
        <div className="bg-white w-full shadow-lg rounded-lg overflow-hidden">
            <div className="p-4 w-full">
                <h2 className="text-xl font-semibold mb-2">{cityData.city}</h2>
                <p className="text-gray-700">Temperature: {cityData.temp}°C</p>
                <p className="text-gray-500">Max Temp: {cityData.maxTemp}°C</p>
                <p className="text-gray-500">Min Temp: {cityData.minTemp}°C</p>
                <p className="text-gray-500">Condition: {cityData.dominantCondition}</p>
            </div>
        </div>
    );
};

export default WeatherCard;