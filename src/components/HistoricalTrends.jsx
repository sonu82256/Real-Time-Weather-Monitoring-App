import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import WeatherChart from './WeatherChart';

const HistoricalTrends = () => {
    const [trends, setTrends] = useState({});
    const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

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
                    console.log(data); // Inspect the data

                    // Aggregate data by day
                    const dailyStats = data.reduce((acc, curr) => {
                        const { date, temp } = curr;
                        // Handle missing or invalid temp values
                        console.log(date, temp)
                        if (temp === undefined || temp === null || isNaN(Number(temp))) {
                            console.warn(`Invalid or missing temperature value for date ${date}: ${temp}`);
                            return acc; // Skip this entry
                        }
                        

                        const tempValue = Number(temp);

                        if (!acc[date]) {
                            acc[date] = {
                                maxTemp: -Infinity,
                                minTemp: Infinity,
                                totalTemp: 0,
                                count: 0
                            };
                        }
                        const dayStats = acc[date];
                        dayStats.maxTemp = Math.max(dayStats.maxTemp, tempValue);
                        dayStats.minTemp = Math.min(dayStats.minTemp, tempValue);
                        dayStats.totalTemp += tempValue;
                        dayStats.count += 1;

                        return acc;
                    }, {});

                    // Calculate average temperature for each day
                    for (const [date, stats] of Object.entries(dailyStats)) {
                        stats.avgTemp = stats.totalTemp / stats.count;
                    }

                    cityTrends[city] = dailyStats;
                } catch (error) {
                    console.error(`Error fetching data for city ${city}:`, error.message);
                    cityTrends[city] = {};
                }
            }

            setTrends(cityTrends);
        };

        fetchTrends();
    }, []);

    return (
        <div>
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
};

export default HistoricalTrends;