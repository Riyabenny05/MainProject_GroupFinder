// src/pages/Splash.jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import splashVideo from '../assets/splash_viedo.mp4'; // ✅ Import your video

const Splash = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      {/* Remove default body margin/padding */}
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
      `}</style>

      <Box
        sx={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
        }}
      >
        {/* 🔁 Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            zIndex: -1,
          }}
        >
          <source src={splashVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Optional Dark Overlay */}
        <Box
          sx={{
            position: 'absolute',
            width: '100vw',
            height: '100vh',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: -1,
          }}
        />

        {/* 🔤 Foreground Content */}
        <Box px={2}>
          <Typography variant="h2" gutterBottom>
            Welcome to MinGlo 🌐
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
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
      </Box>
    </>
  );
};

export default Splash;