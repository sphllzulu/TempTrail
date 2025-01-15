import { Box, Typography, Container } from '@mui/material';
import Weather from '../components/Weather';

const Home = () => {
  return (
    <Container>
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography variant="h2" gutterBottom>
          Weather-Based Travel Planner
        </Typography>
        <Typography variant="h5" gutterBottom>
          Plan your trips based on real-time weather conditions
        </Typography>
      </Box>
      <Weather />
    </Container>
  );
};

export default Home;