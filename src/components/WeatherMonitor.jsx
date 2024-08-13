import React, { useEffect, useState } from 'react';
import { getWeatherData } from '../api/weather';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import WeatherCard from './WeatherCard'; // Import the new WeatherCard component
import Alert from './Alert';
import HistoricalTrends from './HistoricalTrends';

// const cities = ['Bangalore', 'Kolkata'];
const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

const WeatherMonitor = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const dataPromises = cities.map(city => getWeatherData(city));
                const data = await Promise.all(dataPromises);
                setWeatherData(data);
                storeDailySummaries(data); 
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
        const interval = setInterval(fetchWeatherData, 100 * 60 * 1000); 

        return () => clearInterval(interval);
    }, []);

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
        <div className="p-6  max-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-center text-blue-600 " >Real-Time Weather Monitoring</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  w-4/5 mx-auto" >
                {weatherData.map((cityData, index) => (
                    <WeatherCard 
                        key={index}
                        cityData={{
                            city: cities[index],
                            temp: cityData.main.temp,
                            maxTemp: cityData.main.temp_max,
                            minTemp: cityData.main.temp_min,
                            dominantCondition: cityData.weather[0].main,
                        }}
                    />
                ))}
            </div>
            {alerts.length > 0 && <Alert alerts={alerts} />}
            <div className="mt-6">
                <HistoricalTrends />
            </div>
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