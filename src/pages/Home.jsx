import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import StudyGroupCard from '../components/GroupCard';

const Home = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // TEMPORARY: Dummy data since backend is not connected
    setGroups([
      {
        _id: '1',
        title: 'React Learners',
        subject: 'Frontend Development',
        description: 'Learn React, hooks, and component design.',
      },
      {
        _id: '2',
        title: 'Python Devs',
        subject: 'Python Programming',
        description: 'Explore Python basics, OOP, and projects.',
      },
      {
        _id: '3',
        title: 'Cyber Ninjas',
        subject: 'Cybersecurity',
        description: 'Learn ethical hacking and CTF challenges.',
      },
    ]);
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: 'black',
        color: 'white',
        width: '100vw',
        minHeight: '100vh',
        overflowX: 'hidden',
        px: 4,
        py: 8,
      }}
    >
      <Typography variant="h2" align="center" gutterBottom>
        🔍 Explore Study Groups
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        sx={{ color: '#DDA0DD', mb: 10 }}
      >
        Connect, Learn, and Grow with peers sharing the same interests.
      </Typography>

      <Grid container spacing={10} justifyContent="center">
        {groups.length === 0 ? (
          <Typography variant="h6" color="gray">No groups found.</Typography>
        ) : (
          groups.map(group => (
            <Grid item key={group._id} xs={12} sm={6} md={4} lg={3}>
              <StudyGroupCard
                groupId={group._id}
                title={group.title}
                subject={group.subject}
                description={group.description}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Home;
