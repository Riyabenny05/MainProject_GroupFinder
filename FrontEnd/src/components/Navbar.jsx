import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';

const CustomNavbar = () => {
  return (
    <AppBar position="static" color="secondary" sx={{ width: '100vw' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 4 }}>
        <Typography variant="h6" sx={{ color: 'white' }}>
          Study Groups
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomNavbar;
