import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 3,
      }}
    >
      <Typography variant="h3" color="error" gutterBottom>
        403 - Unauthorized
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        You don’t have permission to view this page.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')}>
        Go Back Home
      </Button>
    </Box>
  );
};

export default Unauthorized;
