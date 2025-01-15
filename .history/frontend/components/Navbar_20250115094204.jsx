import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
  IconButton,
  useTheme,
  Menu,
  MenuItem
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { text: 'Home', path: '/' },
    { text: 'Favourites', path: '/favourites' },
    { text: 'About', path: '/about' },
    { text: 'Contact Us', path: '/contact' }
  ];

  const profileMenuItems = [
    { text: 'Login/Sign up', path: '/auth' },
    { text: 'History', path: '/history' }
  ];

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: theme.palette.primary.main,
        color: '#fff'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', backgroundColor: 'rgba(0, 0, 0, 0.40' }}>
        {/* Logo */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 'bold',
            color: '#fff'
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
              sx={{
                color: '#fff',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
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
            onClick={handleProfileClick}
            color="inherit"
            size="large"
            edge="end"
            aria-label="profile"
            aria-controls={open ? 'profile-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'profile-button',
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {profileMenuItems.map((item) => (
              <MenuItem 
                key={item.path}
                component={RouterLink}
                to={item.path}
                onClick={handleClose}
              >
                {item.text}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;