import React, { useEffect, useState } from 'react';
import { getWeatherData } from '../api/weather';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import WeatherSummary from './WeatherSummary';
import Alert from './Alert';
import HistoricalTrends from './HistoricalTrends';

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

const WeatherMonitor = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [alerts, setAlerts] = useState([]);

    // useEffect(() => {
    //     const fetchWeatherData = async () => {
    //         try {
    //             const dataPromises = cities.map(city => getWeatherData(city));
    //             const data = await Promise.all(dataPromises);
    //             setWeatherData(data);
    //             storeDailySummaries(data); 
    //         } catch (error) {
    //             console.error('Error fetching weather data:', error);
    //         }
    //     };

    //     fetchWeatherData();
    //     const interval = setInterval(fetchWeatherData, 100 * 60 * 1000); 

    //     return () => clearInterval(interval);
    // }, []);

    useEffect(() => {
        const userDefinedThreshold = 35;
        const newAlerts = weatherData.filter(cityData => cityData.main.temp > userDefinedThreshold);
        setAlerts(newAlerts);
    }, [weatherData]);

    const storeDailySummaries = async (data) => {
        const dailySummaries = calculateDailySummary(data);
        console.log(data);
        try {
            const dailySummariesRef = collection(db, 'dailySummaries');
            await Promise.all(dailySummaries.map(summary => {
                return addDoc(dailySummariesRef, {
                    city: summary.city,
                    date: summary.date,
                    temp: summary.temp,
                    avgTemp: summary.avgTemp,
                    maxTemp: summary.maxTemp,
                    minTemp: summary.minTemp,
                    dominantCondition: summary.dominantCondition,
                    createdAt: serverTimestamp(),
                });
            }));
        } catch (error) {
            console.error('Error storing daily summaries:', error);
        }
    };

    return (
        <div>
            <h1>Real-Time Weather Monitoring</h1>
            <WeatherSummary weatherData={weatherData} />
            {alerts.length > 0 && <Alert alerts={alerts} />}
            {/* You can choose which city to show trends for by changing the city prop */}
            <HistoricalTrends city="Delhi" />
            {/* Add more HistoricalTrends components for other cities if needed */}
        </div>
    );
};

const calculateDailySummary = (data) => {
    return data.map((cityData, index) => ({
        city: cities[index],
        date: new Date().toISOString().split('T')[0],
        temp: cityData.main.temp,
        avgTemp: cityData.main.temp,
        maxTemp: cityData.main.temp_max,
        minTemp: cityData.main.temp_min,
        dominantCondition: cityData.weather[0].main,
    }));
};

export default WeatherMonitor;