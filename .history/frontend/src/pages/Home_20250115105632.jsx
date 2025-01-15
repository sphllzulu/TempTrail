import './Home.css';
import Weather from '../components/Wearther';
import WeatherSearch from '../components/WeartherSearch';
const Home = () => {
  return (
    <div className="app-container">
      
      <div className="hero-section">
        <div className="search-bar">
          <WeatherSearch/>
        </div>

        <h3 className="hero-heading">
          Your heading text here
        </h3>

        <div className="weather-container">
          <Weather/>
        </div>
      </div>
    </div>
  );
};

export default Home;