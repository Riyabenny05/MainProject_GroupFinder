import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button, Modal, TextField } from '@mui/material';
import StudyGroupCard from '../components/GroupCard';

const Home = () => {
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState('');

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

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    const newGroup = {
      title: groupName,
      subject: 'Custom Group',
      description: `Members: ${members}`,
    };

    // Add to local state (or send to backend if connected)
    setGroups([...groups, { ...newGroup, _id: Date.now().toString() }]);

    // Reset and close
    setGroupName('');
    setMembers('');
    setOpen(false);
  };

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
        sx={{ color: '#DDA0DD', mb: 6 }}
      >
        Connect, Learn, and Grow with peers sharing the same interests.
      </Typography>

      {/* Create Group Button */}
      <Box display="flex" justifyContent="center" mb={6}>
        <Button variant="contained" color="secondary" onClick={() => setOpen(true)}>
          ➕ Create New Group
        </Button>
      </Box>

      {/* Group Cards */}
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

      {/* Create Group Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400, bgcolor: 'white', color: 'black', p: 4, borderRadius: 2
          }}
        >
          <Typography variant="h6" mb={2}>Create a New Group</Typography>
          <form onSubmit={handleCreateGroup}>
            <TextField
              label="Group Name"
              fullWidth
              required
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Members (comma separated)"
              fullWidth
              value={members}
              onChange={(e) => setMembers(e.target.value)}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="secondary" sx={{ mt: 2 }}>
              Create Group
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default Home;
