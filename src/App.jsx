import React from 'react';
import HistoricalTrends from './components/HistoricalTrends';
import WeatherMonitor from './components/WeatherMonitor';

const App = () => {
    return (
        <div>
            <WeatherMonitor />
            {/* <h1>Weather Monitoring Dashboard</h1> */}
            {/* Only render HistoricalTrends once */}
            {/* <HistoricalTrends /> */}
        </div>
    );
};

export default App;