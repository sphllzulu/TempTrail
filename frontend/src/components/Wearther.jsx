import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Weather = () => {
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
          console.log(`Fetching weather for ${city}...`);
          const response = await fetch(
            `http://localhost:3000/api/weather?city=${city}`,
            { credentials: 'include' }
          );
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          console.log(`Received data for ${city}:`, data);
          
          if (data && data.currentWeather) {
            results[city] = data.currentWeather;
          } else {
            console.error(`Invalid data structure for ${city}:`, data);
          }
        }
        
        console.log('Final results:', results);
        setWeatherData(results);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setError(`Failed to fetch weather data: ${error.message}`);
      }
    };

    fetchWeatherData();
    // Refresh every 5 minutes
    const interval = setInterval(fetchWeatherData, 300000);
    return () => clearInterval(interval);
  }, []);

  // Add debug output for render
  console.log('Current weatherData state:', weatherData);

  if (error) {
    return (
      <Typography color="error" sx={{ p: 2 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 'bold' }}>
        South African Weather
      </Typography>
      <Grid container spacing={2}>
        {cities.map((city) => (
          <Grid item xs={12} sm={6} lg={3} key={city}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  {city}
                </Typography>
                {weatherData[city] ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography>Temperature:</Typography>
                      <Typography sx={{ fontWeight: 'medium' }}>
                        {weatherData[city].temperature}°C
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography>Conditions:</Typography>
                      <Typography sx={{ fontWeight: 'medium' }}>
                        {weatherData[city].conditions}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography>Humidity:</Typography>
                      <Typography sx={{ fontWeight: 'medium' }}>
                        {weatherData[city].humidity}%
                      </Typography>
                    </Box>
                    {weatherData[city].icon && (
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                        <img 
                          src={weatherData[city].icon} 
                          alt={`${city} weather icon`}
                          style={{ width: '64px', height: '64px' }}
                        />
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', justifyContent: 'center', height: '128px', alignItems: 'center' }}>
                    <CircularProgress />
                    <Typography sx={{ ml: 2 }}>Loading {city} weather...</Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Weather;