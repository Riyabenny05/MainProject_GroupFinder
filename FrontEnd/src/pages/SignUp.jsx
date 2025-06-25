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
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can show a success message using alert or toast here
    alert('Sign Up successful! Redirecting to Login...');

    // Redirect to login page
    navigate('/login');
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
        p: 2,
      }}
    >
      <Paper elevation={4} sx={{ width: 400, p: 4, borderRadius: 3 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Sign Up
        </Typography>

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
            value={form.email}
            onChange={handleChange}
            type="email"
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
            value={form.password}
            onChange={handleChange}
            type="password"
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
