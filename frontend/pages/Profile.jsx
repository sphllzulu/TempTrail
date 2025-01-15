import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Box, 
  Divider,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import { Trash2 } from 'lucide-react';

const Profile = () => {
  const [favorites, setFavorites] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const [favoritesRes, historyRes] = await Promise.all([
        axios.get('http://localhost:3000/api/favorites', { withCredentials: true }),
        axios.get('http://localhost:3000/api/search-history', { withCredentials: true })
      ]);
      
      setFavorites(favoritesRes.data.favorites);
      setSearchHistory(historyRes.data.searchHistory);
    } catch (error) {
      console.error('Error fetching profile:', error);
      showSnackbar('Error loading profile data', 'error');
    }
  };

  const handleDeleteFavorite = async (destination) => {
    try {
      await axios.delete(`http://localhost:3000/api/favorites/${encodeURIComponent(destination)}`, {
        withCredentials: true
      });
      setFavorites(favorites.filter(fav => fav.destination !== destination));
      showSnackbar('Favorite removed successfully');
    } catch (error) {
      console.error('Error deleting favorite:', error);
      showSnackbar('Error removing favorite', 'error');
    }
  };

  const handleDeleteSearch = async (searchId) => {
    try {
      await axios.delete(`http://localhost:3000/api/search-history/${searchId}`, {
        withCredentials: true
      });
      setSearchHistory(searchHistory.filter(search => search._id !== searchId));
      showSnackbar('Search history entry removed successfully');
    } catch (error) {
      console.error('Error deleting search history:', error);
      showSnackbar('Error removing search history', 'error');
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h3" gutterBottom>
        Profile
      </Typography>

      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        Favorites
      </Typography>
      <Grid container spacing={2}>
        {favorites.map((fav, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <Typography variant="h6">{fav.destination}</Typography>
                    <Typography color="textSecondary">Added by: {fav.name}</Typography>
                  </div>
                  <IconButton 
                    onClick={() => handleDeleteFavorite(fav.destination)}
                    size="small"
                    color="error"
                  >
                    <Trash2 size={20} />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        Search History
      </Typography>
      <Grid container spacing={2}>
        {searchHistory.map((search, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <Typography variant="h6">{search.destination}</Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography>Temperature: {search.weather?.temperature}°C</Typography>
                    <Typography>Humidity: {search.weather?.humidity}%</Typography>
                    <Typography>Conditions: {search.weather?.conditions}</Typography>
                    {search.weather?.icon && (
                      <img 
                        src={search.weather.icon} 
                        alt="Weather icon"
                        style={{ width: 50, height: 50 }}
                      />
                    )}
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                      Searched on: {new Date(search.timestamp).toLocaleString()}
                    </Typography>
                  </div>
                  <IconButton 
                    onClick={() => handleDeleteSearch(search._id)}
                    size="small"
                    color="error"
                  >
                    <Trash2 size={20} />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;