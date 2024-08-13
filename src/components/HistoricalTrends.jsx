import React, { useEffect, useState, memo } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import WeatherChart from './WeatherChart';

const HistoricalTrends = memo(() => {
    const [trends, setTrends] = useState({});
    const cities = ['Bangalore', 'Kolkata']; // Add or remove cities as needed

    useEffect(() => {
        const fetchTrends = async () => {
            const cityTrends = {};

            for (const city of cities) {
                try {
                    const q = query(
                        collection(db, 'dailySummaries'),
                        where('city', '==', city),
                        orderBy('date')
                    );

                    const snapshot = await getDocs(q);
                    const data = snapshot.docs.map(doc => doc.data());

                    // Aggregate data by day
                    const dailyStats = data.reduce((acc, curr) => {
                        const { date, maxTemp, minTemp, temp } = curr;

                        // Ensure all temperature fields are valid
                        if (
                            maxTemp === undefined || maxTemp === null || isNaN(Number(maxTemp)) ||
                            minTemp === undefined || minTemp === null || isNaN(Number(minTemp)) ||
                            temp === undefined || temp === null || isNaN(Number(temp))
                        ) {
                            console.warn(`Invalid or missing temperature values for date ${date}`);
                            return acc; // Skip this entry
                        }

                        // Initialize date entry if it does not exist
                        if (!acc[date]) {
                            acc[date] = {
                                totalTemp: 0,
                                count: 0,
                                maxTemp: maxTemp,
                                minTemp: minTemp
                            };
                        }

                        // Aggregate temperature data
                        acc[date].totalTemp += temp;
                        acc[date].count += 1;
                        acc[date].maxTemp = Math.max(acc[date].maxTemp, maxTemp);
                        acc[date].minTemp = Math.min(acc[date].minTemp, minTemp);

                        return acc;
                    }, {});

                    // Calculate average temperature for each date
                    for (const date in dailyStats) {
                        const stats = dailyStats[date];
                        stats.avgTemp = stats.totalTemp / stats.count;
                        delete stats.totalTemp; // Remove totalTemp from final stats
                        delete stats.count; // Remove count from final stats
                    }

                    // Only add unique data to cityTrends
                    if (!cityTrends[city]) {
                        cityTrends[city] = dailyStats;
                    }

                } catch (error) {
                    console.error(`Error fetching data for city ${city}:`, error.message);
                    cityTrends[city] = {};
                }
            }

            setTrends(cityTrends); // Set the aggregated data to state
        };

        fetchTrends(); // Fetch data on component mount

    }, []); // Ensure useEffect only runs once when the component mounts

    return (
        <div>
            <h1>Weather Monitoring Dashboard</h1>
            <h2>Historical Trends</h2>
            {cities.map(city => (
                <div key={city}>
                    <h3>{city}</h3>
                    {trends[city] && Object.keys(trends[city]).length > 0 ? (
                        <WeatherChart trends={trends[city]} city={city} />
                    ) : (
                        <p>No data available for {city}</p>
                    )}
                </div>
            ))}
        </div>
    );
});

export default HistoricalTrends;