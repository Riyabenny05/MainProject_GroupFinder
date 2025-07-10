import React, { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, Button, Alert, IconButton, Collapse
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [avatar, setAvatar] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showAvatars, setShowAvatars] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
        setName(res.data.name || '');
        setContact(res.data.contact || '');
        setAvatar(res.data.avatar || '');
      } catch (err) {
        setError('Failed to load profile');
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {try {
    const res = await axios.put('/api/users/profile', {
      name,
      contact,
      avatar,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setUser(res.data);
    localStorage.setItem('user', JSON.stringify(res.data)); // ✅ update avatar in localStorage
    setSuccess('Profile updated successfully');
    setTimeout(() => setSuccess(''), 3000);
  } catch (err) {
    setError('Failed to update profile');
    setTimeout(() => setError(''), 3000);
  }};

  if (!user) return <Typography sx={{ p: 4, color: 'white' }}>Loading...</Typography>;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #1a1a2e, #2a003f)',
        color: 'white',
        p: 4,
        boxSizing: 'border-box'
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
        <img
          src={avatar || '/avatars/default1.png'}
          alt="avatar"
          onClick={() => setShowAvatars(!showAvatars)}
          style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            cursor: 'pointer',
            border: '3px solid white',
            objectFit: 'cover'
          }}
        />
        <IconButton onClick={() => setShowAvatars(!showAvatars)} sx={{ color: 'white' }}>
          <ExpandMoreIcon />
        </IconButton>
        <Collapse in={showAvatars}>
          <Box display="flex" gap={2} flexWrap="wrap" mt={2} justifyContent="center">
            {['default1.png', 'default2.png', 'default3.png'].map((file) => {
              const path = `/avatars/${file}`;
              return (
                <img
                  key={file}
                  src={path}
                  alt="avatar"
                  onClick={() => setAvatar(path)}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    border: avatar === path ? '3px solid #4caf50' : '2px solid #ccc',
                    objectFit: 'cover'
                  }}
                />
              );
            })}
          </Box>
        </Collapse>
      </Box>

      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ input: { color: 'white' }, label: { color: 'white' } }}
      />
      <TextField
        label="Contact"
        fullWidth
        margin="normal"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        sx={{ input: { color: 'white' }, label: { color: 'white' } }}
      />

      <Button variant="contained" onClick={handleUpdate} sx={{ mt: 3 }}>
        Save Changes
      </Button>
    </Box>
  );
};

export default Profile;