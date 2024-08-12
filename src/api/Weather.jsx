import axios from 'axios';

const API_KEY = 'bfc25d1dbdecbd4312bccac83a8dd4b9'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeatherData = async (city) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric'  // For Celsius
            }
        });
        return response.data;
        console.log(response.data)
    } catch (error) {
        console.error('Failed to fetch weather data', error);
        throw error;
    }
};