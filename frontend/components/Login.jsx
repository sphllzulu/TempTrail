// Login.jsx
import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/login',
        { username, password },
        { withCredentials: true }
      );
      console.log('Logged in:', response.data);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h3" gutterBottom>
        Login
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;