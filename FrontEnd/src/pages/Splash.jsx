// src/pages/Splash.jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Splash = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #1a1a40, #1a1a2e)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Typography variant="h2" gutterBottom>
        Welcome to MinGlo 🌐
      </Typography>
      <Typography variant="h6" sx={{ mb: 4, maxWidth: '600px' }}>
        Connect. Collaborate. Grow. Your gateway to powerful study groups starts here.
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={handleLoginClick}
        sx={{
          backgroundColor: '#DDA0DD',
          color: '#000',
          fontWeight: 'bold',
          px: 4,
          py: 1.5,
          '&:hover': {
            backgroundColor: '#c57ac3',
          },
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Splash;
