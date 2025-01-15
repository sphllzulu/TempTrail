import './Home.css';
im
const Home = () => {
  return (
    <div className="app-container">
      
      <div className="hero-section">
        <div className="search-bar">

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