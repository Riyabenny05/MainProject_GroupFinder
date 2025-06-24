import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StudyGroupCard = ({ title, subject, description, groupId }) => {
  const navigate = useNavigate();

  const handleJoin = () => {
    // Navigate to group details with data
    navigate(`/group/${groupId}`, {
      state: { title, subject, description },
    });
  };

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
        <Button variant="outlined" size="small" onClick={handleJoin}>
          Join
        </Button>
      </CardActions>
    </Card>
  );
};

export default StudyGroupCard;
