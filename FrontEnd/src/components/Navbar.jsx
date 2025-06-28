import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const CustomNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const homePath = user
    ? user.role === 'admin'
      ? '/admin-dashboard'
      : '/home'
    : '/';

  return (
    <AppBar position="static" color="secondary" sx={{ width: '100%' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 4 }}>
        <Typography
          variant="h5"
          sx={{ color: 'white', cursor: 'pointer' }}
          fontFamily="italic"
          onClick={() => navigate(homePath)}
        >
          MinGlo
        </Typography>

        <Box>
          <Button color="inherit" component={Link} to={homePath}>
            Home
          </Button>

          {!user ? (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Sign Up
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomNavbar;
