import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  IconButton,
  Snackbar,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import mapboxgl from 'mapbox-gl'; // Import Mapbox GL JS

// Set Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1Ijoic3BobGx6dWx1IiwiYSI6ImNtNXdreTFvMDBhNWMybHNjMDh4NDV4b3EifQ.hnFotPUmBuiHsbbLbtfTrg';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activities, setActivities] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

  // Ref for the map container and map instance
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  // Initialize or update the map when mapCenter changes
  useEffect(() => {
    if (mapCenter.lat !== 0 && mapCenter.lng !== 0) {
      if (!map.current) {
        // Initialize the map if it doesn't exist
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11', // Map style
          center: [mapCenter.lng, mapCenter.lat], // Initial map center
          zoom: 12, // Initial zoom level
        });
      } else {
        // Update the map center if the map already exists
        map.current.setCenter([mapCenter.lng, mapCenter.lat]);
      }

      // Remove the existing marker if it exists
      if (marker.current) {
        marker.current.remove();
      }

      // Add a new marker for the searched city
      marker.current = new mapboxgl.Marker()
        .setLngLat([mapCenter.lng, mapCenter.lat])
        .addTo(map.current);
    }
  }, [mapCenter]);

  // Fetch weather and forecast data
  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/weather?city=${city}`,
        { withCredentials: true }
      );

      // Set current weather and forecast data
      setWeather(response.data.currentWeather);
      setForecast(response.data.forecast);
      setMapCenter({
        lat: response.data.currentWeather.lat,
        lng: response.data.currentWeather.lon,
      });

      // Fetch activities based on weather conditions
      const activitiesResponse = await axios.get(
        `http://localhost:3000/api/activities?city=${city}&weatherCondition=${response.data.currentWeather.conditions}`,
        { withCredentials: true }
      );
      setActivities(activitiesResponse.data.activities);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setSnackbarMessage('Error fetching weather data');
      setSnackbarOpen(true);
    }
  };

  // Add a city to favorites
  const addToFavorites = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/favorites',
        { destination: city },
        { withCredentials: true }
      );
      setFavorites(response.data.favorites);
      setSnackbarMessage('Added to favorites!');
      setSnackbarOpen(true);
    } catch (error) {
      if (error.response?.status === 401) {
        setSnackbarMessage('Please login to add favorites');
      } else {
        setSnackbarMessage('Error adding to favorites');
      }
      setSnackbarOpen(true);
    }
  };

  // Check if a city is in favorites
  const isCityInFavorites = () => {
    return favorites.some((fav) => fav.destination.toLowerCase() === city.toLowerCase());
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h3" gutterBottom>
        Weather Search
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
        <TextField
          label="Enter city"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              fetchWeather();
            }
          }}
        />
        <Button variant="contained" onClick={fetchWeather}>
          Search
        </Button>
      </Box>

      {/* Current Weather */}
      {weather && (
        <Card sx={{ marginBottom: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h4">{weather.city}</Typography>
              <IconButton onClick={addToFavorites} color="primary">
                {isCityInFavorites() ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Box>
            <Typography>Temperature: {weather.temperature}°C</Typography>
            <Typography>Conditions: {weather.conditions}</Typography>
            <Typography>Humidity: {weather.humidity}%</Typography>
            <img src={weather.icon} alt="Weather icon" />
          </CardContent>
        </Card>
      )}

      {/* 7-Day Forecast */}
      {forecast.length > 0 && (
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h5" gutterBottom>
            7-Day Forecast
          </Typography>
          <Grid container spacing={2}>
            {forecast.map((day, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{day.date}</Typography>
                    <Typography>Temperature: {day.temperature}°C</Typography>
                    <Typography>Conditions: {day.conditions}</Typography>
                    <img src={day.icon} alt="Weather icon" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Suggested Activities */}
      {activities.length > 0 && (
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h5" gutterBottom>
            Suggested Activities
          </Typography>
          <Grid container spacing={2}>
            {activities.map((activity, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{activity.name}</Typography>
                    <Typography>Rating: {activity.rating}</Typography>
                    <Typography>Address: {activity.address}</Typography>
                    {activity.photo && (
                      <img src={activity.photo} alt={activity.name} style={{ width: '100%' }} />
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      href={activity.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Map */}
      {mapCenter.lat !== 0 && mapCenter.lng !== 0 && (
        <Box
          ref={mapContainer}
          sx={{ height: '400px', width: '100%', marginBottom: 3 }}
        />
      )}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default Weather;