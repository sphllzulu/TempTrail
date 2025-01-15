import { useState } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const WeatherSearch = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
        sx={{
          width: '400px',
          '& .MuiOutlinedInput-root': {
            height: '40px',
          },
        }}
      />
      <IconButton 
        onClick={handleSearch}
        sx={{ ml: 1 }}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default WeatherSearch;