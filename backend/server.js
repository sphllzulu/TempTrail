require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');
const cors = require('cors');
const User = require('./models/users');
const MongoStore=require('connect-mongo')
const axios = require('axios');

const app= express()
const PORT = process.env.PORT || 5000;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const FOURSQUARE_API_KEY=process.env.FOURSQUARE_API_KEY

//middleware
app.use(cors({ origin: `http://localhost:5173`, credentials: true }));
app.use(express.json())
app.use(session({
    //used to encrypt the session
    secret:process.env.SESSION_SECRET,
    //dont save session if nothing changed
    resave:false,
    //dont create session until something is stored
    saveUninitialized: false,
    store:MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions'
      }),
    cookie: {
        //only send cookie over https in production
        secure: process.env.NODE_ENV === 'production',
        //session lasts for 24hrs
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
      }
}))

//database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

  //authentication middleware, if session does not contain userId then you get an error
  //otherwise the next operation conitnues
  const authMiddleware = (req, res, next) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
  };

//auth routes
app.post('/api/auth/register',async(req,res)=>{
    try{
        const {username,password}=req.body;
        const user=new User({username,password});
        await user.save();
        //saving the id that was created by mongo and storing it in the session
        req.session.userId=user._id;
        res.status(201).json({message:'user registered',user})
    }catch(err){
        res.status(400).json({error:err.message});
    }
})

app.post('/api/auth/login',async(req,res)=>{
    try{
        const {username,password}=req.body;
        //first find user record with the username provided by user
        const user=await User.findOne({username})
        //compare that password with the one on the database
        if(!user || !(await bcrypt.compare(password,user.password))){
            throw new Error('Invalid credentials')
        }
        req.session.userId=user._id;
        res.json({message:'Logged in',user})
    }
        catch(err){
            res.status(400).json({error:err.message});
        }

    }
);

app.post('/api/auth/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            return res.status(500).json({error:'Could no log out'})
        }
        res.clearCookie('connect.sid');
        res.json({message:'Logged out'});
    })
})

//Weather routes
app.get('/api/weather', async (req, res) => {
  //destructuring by extracting the city from the request query
    const { city } = req.query;
  //retrieves userId from the session which stores userId when user logs in if the user is authenticated
    const userId = req.session.userId;
  
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }
  
    try {
      // Fetch current weather
      const currentWeatherUrl = `${BASE_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
      const currentWeatherResponse = await axios.get(currentWeatherUrl);
  
      // Fetch 5-day forecast
      const forecastUrl = `${BASE_URL}/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
      const forecastResponse = await axios.get(forecastUrl);
  
      // Extract current weather data
      const currentWeather = {
        city: currentWeatherResponse.data.name,
        temperature: currentWeatherResponse.data.main.temp,
        humidity: currentWeatherResponse.data.main.humidity,
        conditions: currentWeatherResponse.data.weather[0].main,
        icon: `https://openweathermap.org/img/wn/${currentWeatherResponse.data.weather[0].icon}@2x.png`,
        lat: currentWeatherResponse.data.coord.lat,
        lon: currentWeatherResponse.data.coord.lon,
      };
  
      // Process forecast data
      const forecastData = forecastResponse.data.list.reduce((acc, item) => {
        const date = item.dt_txt.split(' ')[0];
        if (!acc[date]) {
          acc[date] = {
            date,
            temperature: item.main.temp,
            conditions: item.weather[0].main,
            icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
          };
        }
        return acc;
      }, {});
  
      const forecast = Object.values(forecastData).slice(0, 7);
  
      // Save search history for authenticated users with weather data
      if (userId) {
        await User.findByIdAndUpdate(userId, {
          $push: {
            searchHistory: {
              destination: city,
              weather: {
                temperature: currentWeather.temperature,
                humidity: currentWeather.humidity,
                conditions: currentWeather.conditions,
                icon: currentWeather.icon,
                lat: currentWeather.lat,
                lon: currentWeather.lon
              }
            }
          }
        });
      }
  
      res.json({
        currentWeather,
        forecast,
      });
    } catch (error) {
      console.error('Weather API Error:', error.response?.data || error);
      res.status(500).json({
        error: 'Failed to fetch weather data',
        details: error.response?.data?.message || error.message,
      });
    }
  });

  //activities
 // Updated activities endpoint with proper error handling and category mapping
app.get('/api/activities', async (req, res) => {
    const { city, weatherCondition } = req.query;
  
    if (!city || !weatherCondition) {
      return res.status(400).json({ error: 'City and weather condition are required' });
    }
  
    try {
      // Step 1: Get latitude and longitude of the city using OpenWeatherMap API
      const weatherResponse = await axios.get(
        `${BASE_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}`
      );
      const { lat, lon } = weatherResponse.data.coord;
  
      // Step 2: Determine activity categories based on weather condition
      // Using Foursquare category IDs for more accurate results
      // https://developer.foursquare.com/docs/build-with-foursquare/categories/
      let categoryIds = [];
      switch (weatherCondition.toLowerCase()) {
        case 'sunny':
        case 'clear':
          categoryIds = '16032,16000,16015'; // Parks, Outdoor Activities, Hiking
          break;
        case 'rain':
        case 'clouds':
          categoryIds = '10025,13003,10035'; // Museums, Coffee Shops, Movie Theaters
          break;
        case 'snow':
          categoryIds = '16026,10056'; // Ski Areas, Sports & Recreation
          break;
        default:
          categoryIds = '16000,13065'; // Outdoor Activities, Restaurants
      }
  
      // Step 3: Fetch activities from Foursquare API with proper headers
      const foursquareResponse = await axios.get(
        `https://api.foursquare.com/v3/places/search`,
        {
          params: {
            ll: `${lat},${lon}`,
            categories: categoryIds,
            limit: 5,
            radius: 5000, // 5km radius
            sort: 'RATING'
          },
          headers: {
            'Accept': 'application/json',
            'Authorization': FOURSQUARE_API_KEY
          }
        }
      );
  
      // Step 4: Format and return activity suggestions with error handling for missing data
      const activities = foursquareResponse.data.results.map((place) => ({
        name: place.name,
        address: place.location?.formatted_address || 'Address not available',
        rating: place.rating || 'Not rated',
        // Handle cases where photos might not be available
        photo: place.photos?.[0] 
          ? `${place.photos[0].prefix}300x300${place.photos[0].suffix}`
          : null,
        url: place.website || `https://foursquare.com/v/${place.fsq_id}`
      }));
  
      res.json({ activities });
    } catch (error) {
      console.error('Error fetching activities:', error);
      
      // More detailed error response
      const errorMessage = error.response?.data?.message || error.message;
      const statusCode = error.response?.status || 500;
      
      res.status(statusCode).json({ 
        error: 'Failed to fetch activities',
        details: errorMessage,
        // Don't expose API keys in error messages
        source: error.config?.url?.replace(FOURSQUARE_API_KEY, '[REDACTED]')
      });
    }
  });

  
  // Get search history
app.get('/api/search-history', authMiddleware, async (req, res) => {
    const userId = req.session.userId;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ searchHistory: user.searchHistory });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch search history' });
    }
  });

  // Get favorites
app.get('/api/favorites', authMiddleware, async (req, res) => {
    const userId = req.session.userId;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ favorites: user.favorites });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch favorites' });
    }
  });

  // Add to favorites
app.post('/api/favorites', authMiddleware, async (req, res) => {
    const { destination } = req.body;
    const userId = req.session.userId;
  
    try {
      // Find the user and add the destination to their favorites
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Add the destination and user's name to favorites
      user.favorites.push({ destination, name: user.username });
      await user.save();
  
      res.json({ message: 'Destination added to favorites', favorites: user.favorites });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add to favorites' });
    }
  });

  app.get('/api/weather', async (req, res) => {
  const { city } = req.query;
  const userId = req.session.userId;

  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }

  try {
    // Fetch current weather
    const currentWeatherUrl = `${BASE_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
    const currentWeatherResponse = await axios.get(currentWeatherUrl);

    // Fetch 5-day forecast
    const forecastUrl = `${BASE_URL}/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
    const forecastResponse = await axios.get(forecastUrl);

    // Extract current weather data
    const currentWeather = {
      city: currentWeatherResponse.data.name,
      temperature: currentWeatherResponse.data.main.temp,
      humidity: currentWeatherResponse.data.main.humidity,
      conditions: currentWeatherResponse.data.weather[0].main,
      icon: `https://openweathermap.org/img/wn/${currentWeatherResponse.data.weather[0].icon}@2x.png`,
      lat: currentWeatherResponse.data.coord.lat,
      lon: currentWeatherResponse.data.coord.lon,
    };

    // Process forecast data
    const forecastData = forecastResponse.data.list.reduce((acc, item) => {
      const date = item.dt_txt.split(' ')[0];
      if (!acc[date]) {
        acc[date] = {
          date,
          temperature: item.main.temp,
          conditions: item.weather[0].main,
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        };
      }
      return acc;
    }, {});

    const forecast = Object.values(forecastData).slice(0, 7);

    // Save search history for authenticated users with weather data
    if (userId) {
      await User.findByIdAndUpdate(userId, {
        $push: {
          searchHistory: {
            destination: city,
            weather: {
              temperature: currentWeather.temperature,
              humidity: currentWeather.humidity,
              conditions: currentWeather.conditions,
              icon: currentWeather.icon,
              lat: currentWeather.lat,
              lon: currentWeather.lon
            }
          }
        }
      });
    }

    res.json({
      currentWeather,
      forecast,
    });
  } catch (error) {
    console.error('Weather API Error:', error.response?.data || error);
    res.status(500).json({
      error: 'Failed to fetch weather data',
      details: error.response?.data?.message || error.message,
    });
  }
});

// Delete favorite endpoint
app.delete('/api/favorites/:destination', authMiddleware, async (req, res) => {
    const userId = req.session.userId;
    const { destination } = req.params;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Remove the favorite with the matching destination
      user.favorites = user.favorites.filter(
        fav => fav.destination.toLowerCase() !== decodeURIComponent(destination).toLowerCase()
      );
      await user.save();
  
      res.json({ 
        message: 'Favorite removed successfully', 
        favorites: user.favorites 
      });
    } catch (error) {
      console.error('Error removing favorite:', error);
      res.status(500).json({ error: 'Failed to remove favorite' });
    }
  });
  
  // Delete search history entry endpoint
  app.delete('/api/search-history/:id', authMiddleware, async (req, res) => {
    const userId = req.session.userId;
    const { id } = req.params;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Remove the search history entry with the matching ID
      user.searchHistory = user.searchHistory.filter(
        search => search._id.toString() !== id
      );
      await user.save();
  
      res.json({ 
        message: 'Search history entry removed successfully', 
        searchHistory: user.searchHistory 
      });
    } catch (error) {
      console.error('Error removing search history entry:', error);
      res.status(500).json({ error: 'Failed to remove search history entry' });
    }
  });
  
  // Clear all search history endpoint (optional)
  app.delete('/api/search-history', authMiddleware, async (req, res) => {
    const userId = req.session.userId;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Clear all search history
      user.searchHistory = [];
      await user.save();
  
      res.json({ 
        message: 'Search history cleared successfully', 
        searchHistory: user.searchHistory 
      });
    } catch (error) {
      console.error('Error clearing search history:', error);
      res.status(500).json({ error: 'Failed to clear search history' });
    }
  });


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });