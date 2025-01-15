import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const WeatherSearch = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    onSearch(city);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
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
  );
};

export default WeatherSearch;