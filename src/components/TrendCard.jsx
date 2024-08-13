import React from 'react';
import WeatherChart from './WeatherChart'; // Assuming you already have a WeatherChart component

const TrendCard = ({ city, trends }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-4/5 max-w-50% mx-auto my-4 ">
            <div className="p-6">
                <h3 className="text-2xl font-semibold mb-4">{city}</h3>
                {trends && Object.keys(trends).length > 0 ? (
                    <WeatherChart trends={trends} city={city} />
                ) : (
                    <p className="text-gray-500">No data available</p>
                )}
            </div>
        </div>
    );
};

export default TrendCard;