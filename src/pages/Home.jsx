import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import StudyGroupCard from '../components/GroupCard';

const groupList = [
  {
    title: 'Python Learners',
    subject: 'Python Programming',
    description: 'Beginners welcome! Learn syntax, OOP, and basic projects.',
  },
  {
    title: 'ReactJS Masters',
    subject: 'Frontend Web Development',
    description: 'Explore React hooks, components, and MUI integration.',
  },
  {
    title: 'Math Wizards',
    subject: 'Calculus & Algebra',
    description: 'Solve problems together and prepare for competitive exams.',
  },
  {
    title: 'CTF Crackers',
    subject: 'Cybersecurity',
    description: 'Join this group to learn ethical hacking and CTF solving.',
  },
];

const Dashboard = () => {
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
        {groupList.map((group, i) => (
          <Grid item key={i} xs={2} sm={6} md={4} lg={3}>
            <StudyGroupCard
              title={group.title}
              subject={group.subject}
              description={group.description}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
