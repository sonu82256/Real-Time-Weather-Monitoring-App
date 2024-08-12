export const calculateDailySummary = (weatherData) => {
    const summaries = weatherData.reduce((acc, cityData) => {
        const date = new Date(cityData.dt * 1000).toDateString();

        if (!acc[date]) {
            acc[date] = {
                totalTemp: 0,
                count: 0,
                maxTemp: -Infinity,
                minTemp: Infinity,
                dominantCondition: {},
                dominantConditionCount: 0,
            };
        }

        const summary = acc[date];
        summary.totalTemp += cityData.main.temp;
        summary.count += 1;
        summary.maxTemp = Math.max(summary.maxTemp, cityData.main.temp);
        summary.minTemp = Math.min(summary.minTemp, cityData.main.temp);

        const condition = cityData.weather[0].main;
        summary.dominantCondition[condition] = (summary.dominantCondition[condition] || 0) + 1;

        if (summary.dominantCondition[condition] > summary.dominantConditionCount) {
            summary.dominantConditionCount = summary.dominantCondition[condition];
            summary.dominantConditionName = condition;
        }

        return acc;
    }, {});

    return Object.entries(summaries).map(([date, summary]) => ({
        date,
        avgTemp: summary.totalTemp / summary.count,
        maxTemp: summary.maxTemp,
        minTemp: summary.minTemp,
        dominantCondition: summary.dominantConditionName,
    }));
};