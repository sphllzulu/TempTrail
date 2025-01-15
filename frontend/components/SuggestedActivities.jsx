import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
} from '@mui/material';

const SuggestedActivities = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return null;
  }

  return (
    <Box sx={{ marginBottom: 3 }}>
      <Typography variant="h5" gutterBottom>
        Suggested Activities
      </Typography>
      <Grid container spacing={2}>
        {activities.map((activity, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{activity.name}</Typography>
                <Typography>Rating: {activity.rating}</Typography>
                <Typography>Address: {activity.address}</Typography>
                {activity.photo && (
                  <img src={activity.photo} alt={activity.name} style={{ width: '100%' }} />
                )}
                <Button
                  variant="contained"
                  color="primary"
                  href={activity.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SuggestedActivities;