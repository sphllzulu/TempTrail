import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const WeatherSearch = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    onSearch(city);
  };

  return (
    <Box>
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
              handleSearch();
            }
          }}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default WeatherSearch;