import React from 'react';
import { Box, Container } from '@mui/material';
import Searchbar from '../components/Searchbar';
import WeatherCard from '../components/WeatherCard';
import Activities from '../components/Activities';

// Hero component that serves as a background container for weather-related components
const Hero = () => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '80vh', // Reduced from 100vh to make room for Activities
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <Searchbar />
          <WeatherCard />
        </Box>
      </Container>
    </Box>
  );
};

// Updated Home component with Activities section
function Home() {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Hero />
      <Box 
        sx={{ 
          width: '100%',
          py: 6, // Add padding top and bottom
          bgcolor: 'background.default' // Use theme background color
        }}
      >
        <Container maxWidth="lg">
          <Activities />
        </Container>
      </Box>
    </Box>
  );
}

export default Home;