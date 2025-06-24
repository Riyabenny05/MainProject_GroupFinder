import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const GroupDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const { title, subject, description } = location.state || {};

  return (
    <Box sx={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', p: 5 }}>
      <Typography variant="h3" sx={{ color: '#DDA0DD' }}>📘 {title || 'Group Name'}</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>Subject: {subject || 'N/A'}</Typography>
      <Typography sx={{ mt: 2 }}>{description || 'No description available.'}</Typography>
      <Typography sx={{ mt: 5, color: 'gray' }}>Group ID: {id}</Typography>
    </Box>
  );
};

export default GroupDetails;
