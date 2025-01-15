import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  styled,
  Grid,
  Container
} from '@mui/material';

// Styled component for the weather icon container
const IconContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 100,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(2)
}));

// Weather data array for multiple cards
const weatherData = [
  {
    city: 'London',
    temperature: '18°C',
    humidity: '70%',
    condition: 'Cloudy'
  },
  {
    city: 'New York',
    temperature: '22°C',
    humidity: '65%',
    condition: 'Sunny'
  },
  {
    city: 'Tokyo',
    temperature: '24°C',
    humidity: '80%',
    condition: 'Rainy'
  },
  {
    city: 'Paris',
    temperature: '20°C',
    humidity: '75%',
    condition: 'Partly Cloudy'
  }
];

function WeatherCard({ city, temperature, humidity, condition }) {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 345, height: '100%' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {city}
        </Typography>
        
        <IconContainer>
          {/* Weather icon placeholder */}
        </IconContainer>

        <Typography variant="h6" gutterBottom>
          Temperature: {temperature}
        </Typography>
        
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Humidity: {humidity}
        </Typography>
        
        <Typography variant="body1" color="text.secondary">
          {condition}
        </Typography>
      </CardContent>
    </Card>
  );
}

function WeatherCardsContainer() {
  return (
    <Container maxWidth="lg">
      <Box pt={2.5} display="flex" justifyContent="center">
        <Grid container spacing={3} justifyContent="center">
          {weatherData.map((data, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <WeatherCard {...data} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default WeatherCardsContainer;