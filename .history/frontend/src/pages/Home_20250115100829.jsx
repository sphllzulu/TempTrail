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

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-gray-100 p-4">
        {/* Navbar content goes here */}
      </nav>

      {/* Hero Section */}
      <div className="w-[850px] mx-auto grid gap-6 p-8 justify-items-center">
        {/* Search Bar */}
        <input 
          type="text"
          placeholder="Search..."
          className="w-[550px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Hero Text */}
        <h3 className="text-xl font-semibold text-center">
          Your heading text here
        </h3>

        {/* Weather Container */}
        <div className="w-full p-4 bg-gray-100 rounded-md">
          {/* Weather content goes here */}
        </div>
      </div>
    </div>
  );
};

export default Layout;