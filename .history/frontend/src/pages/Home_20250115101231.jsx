// import React from 'react';
// import { Box, Container } from '@mui/material';
// import Searchbar from '../components/Searchbar';
// import WeatherCard from '../components/WeatherCard';
// import Activities from '../components/Activities';

// const Hero = () => {
//   return (
//     <Box
//       sx={{
//         width: '100%',
//         minHeight: '80vh',
//         backgroundImage: 'url("/unsplash.jpg")', // Add background image
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//         position: 'relative',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         pt: 4,
//         '&::before': {  // Add an overlay to ensure text remains readable
//           content: '""',
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: 'rgba(0, 0, 0, 0.4)', // Darkens the background image
//           zIndex: 0,
//         },
//       }}
//     >
//       <Container maxWidth="lg">
//         <Box
//           sx={{
//             position: 'relative',
//             zIndex: 1,
//             width: '100%',
//             display: 'flex',
//             flexDirection: 'column',
//             gap: 4,
//           }}
//         >
//           <Searchbar />
//           <WeatherCard />
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// function Home() {
//   return (
//     <Box sx={{ minHeight: '100vh' }}>
//       <Hero />
//       <Box 
//         sx={{ 
//           width: '100%',
//           py: 6,
//           bgcolor: 'background.default'
//         }}
//       >
//         <Container maxWidth="lg">
//           <Activities />
//         </Container>
//       </Box>
//     </Box>
//   );
// }

// export default Home;

import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="app-container">
      <nav className="navbar">
        {/* Navbar content goes here */}
      </nav>

      <div className="hero-section">
        <input 
          type="text"
          placeholder="Search..."
          className="search-bar"
        />

        <h3 className="hero-heading">
          Your heading text here
        </h3>

        <div className="weather-container">
          {/* Weather content goes here */}
        </div>
      </div>
    </div>
  );
};

export default Home;