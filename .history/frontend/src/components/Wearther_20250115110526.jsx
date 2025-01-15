import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const SouthAfricanWeather = () => {
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState(null);

  const cities = [
    "Soweto",
    "Cape Town",
    "Durban",
    "Pretoria"
  ];

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const results = {};
        for (const city of cities) {
          const response = await fetch(
            `http://localhost:3000/api/weather?city=${city}`,
            { credentials: 'include' }
          );
          const data = await response.json();
          results[city] = data.currentWeather;
        }
        setWeatherData(results);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setError('Failed to fetch weather data');
      }
    };

    fetchWeatherData();
    // Refresh every 5 minutes
    const interval = setInterval(fetchWeatherData, 300000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="p-4 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">South African Weather</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cities.map((city) => (
          <Card key={city} className="overflow-hidden">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">{city}</h2>
              {weatherData[city] ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Temperature:</span>
                    <span className="font-medium">
                      {weatherData[city].temperature}°C
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Conditions:</span>
                    <span className="font-medium">
                      {weatherData[city].conditions}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Humidity:</span>
                    <span className="font-medium">
                      {weatherData[city].humidity}%
                    </span>
                  </div>
                  {weatherData[city].icon && (
                    <div className="flex justify-center mt-2">
                      <img 
                        src={weatherData[city].icon} 
                        alt={`${city} weather icon`}
                        className="w-16 h-16"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SouthAfricanWeather;