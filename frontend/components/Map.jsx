import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import mapboxgl from 'mapbox-gl';

// Set Mapbox access token
mapboxgl.accessToken = import.meta.env.VITE_TOKEN;

const Map = ({ center }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  useEffect(() => {
    if (center.lat !== 0 && center.lng !== 0) {
      if (!map.current) {
        // Initialize the map if it doesn't exist
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [center.lng, center.lat],
          zoom: 12,
        });
      } else {
        // Update the map center if the map already exists
        map.current.setCenter([center.lng, center.lat]);
      }

      // Remove the existing marker if it exists
      if (marker.current) {
        marker.current.remove();
      }

      // Add a new marker for the searched city
      marker.current = new mapboxgl.Marker()
        .setLngLat([center.lng, center.lat])
        .addTo(map.current);
    }
  }, [center]);

  return (
    <Box
      ref={mapContainer}
      sx={{ height: '400px', width: '100%', marginBottom: 3 }}
    />
  );
};

export default Map;