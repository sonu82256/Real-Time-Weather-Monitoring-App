import React from 'react';
import HistoricalTrends from './components/HistoricalTrends';
import WeatherMonitor from './components/WeatherMonitor'

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

const App = () => {
    return (
        <div>
            <WeatherMonitor />
            <h1>Weather Monitoring Dashboard</h1>
            <HistoricalTrends />
        </div>
    );
};

export default App;