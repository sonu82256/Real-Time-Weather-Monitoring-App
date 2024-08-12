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
                    const summaries = snapshot.docs.map(doc => doc.data());

                    cityTrends[city] = summaries;
                } catch (error) {
                    console.error(`Error fetching data for city ${city}:`, error.message);
                    cityTrends[city] = [];
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
                    {trends[city] && Array.isArray(trends[city]) && trends[city].length > 0 ? (
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