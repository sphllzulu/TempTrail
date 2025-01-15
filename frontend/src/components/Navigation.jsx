import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
  IconButton,
  useTheme
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navigation() {
  const theme = useTheme();

  const navItems = [
    { text: 'Home', path: '/' },
    { text: 'Favourites', path: '/favourites' },
    { text: 'About', path: '/about' },
    { text: 'Contact Us', path: '/contact' }
  ];

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 'bold',
            color: theme.palette.primary.main
          }}
        >
          LOGO
        </Typography>

        {/* Navigation Links */}
        <Stack 
          direction="row" 
          spacing={2}
          sx={{ flexGrow: 1, justifyContent: 'center' }}
        >
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={RouterLink}
              to={item.path}
              color="inherit"
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              {item.text}
            </Button>
          ))}
        </Stack>

        {/* Profile */}
        <Box>
          <IconButton 
            color="inherit"
            size="large"
            edge="end"
            aria-label="profile"
          >
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;