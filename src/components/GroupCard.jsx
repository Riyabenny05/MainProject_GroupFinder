import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Box } from '@mui/material';

const StudyGroupCard = ({ title, subject, description }) => {
  return (
    <Card
      sx={{
        width: 320,
        m: 2,
        borderRadius: 4,
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 6,
        },
        backgroundColor: '#fffefc',
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#673ab7' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {subject}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="outlined" size="small">Join</Button>
      </CardActions>
    </Card>
  );
};

export default StudyGroupCard;
