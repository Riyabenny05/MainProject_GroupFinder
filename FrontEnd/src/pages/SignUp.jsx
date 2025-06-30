import React, { useState } from 'react';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Paper,
  Link as MuiLink,
  Alert,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from '../utils/axios'; 

const SignUp = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [form, setForm] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    agree: false,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const { name, email, contact, password } = form;

      // ✅ POST to full backend URL via axios instance
      await axios.post('/auth/register', { name, email, contact, password });

      setSuccess('✅ Sign up successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || '❌ Something went wrong!');
    }
  };

  const isFormValid =
    form.name.trim() &&
    form.email.trim() &&
    form.contact.trim() &&
    form.password.trim() &&
    form.agree;

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
        <Typography variant="h5" textAlign="center" gutterBottom>
          Sign Up
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            name="name"
            label="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="contact"
            label="Contact Number"
            value={form.contact}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.agree}
                onChange={handleChange}
                name="agree"
              />
            }
            label="I agree to the Terms and Conditions"
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={!isFormValid}
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </form>

        <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <MuiLink component={RouterLink} to="/login" underline="hover">
            Login
          </MuiLink>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignUp;
