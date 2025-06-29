import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
  Paper,
  Link as MuiLink,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ✅ Make sure this import is correct

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { login } = useAuth(); // ✅ hook from context
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleLogin = (e) => {
  e.preventDefault();

  // 🧠 Determine role based on email
  const role = email === 'admin@example.com' ? 'admin' : 'user';

  const userData = {
    email,
    role,
    name: role === 'admin' ? 'Admin User' : 'Regular User',
  };

  login(userData);

  // 🔁 Redirect
  if (role === 'admin') {
    navigate('/admin-dashboard');
  } else {
    navigate('/home');
  }
};


  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f2f2f2',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: isMobile ? '100%' : 400,
          padding: isMobile ? 2 : 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" textAlign="center" mb={3}>
          Login
        </Typography>

        <form onSubmit={handleLogin} autoComplete="off">
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>

        <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <MuiLink component={RouterLink} to="/signup" underline="hover">
            Sign Up
          </MuiLink>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
