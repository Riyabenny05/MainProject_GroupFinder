import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Alert
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../utils/axios';

const UserManage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [editData, setEditData] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const foundUser = res.data.find((u) => u._id === id);
        if (foundUser) {
          setUser(foundUser);
          setEditData({ name: foundUser.name, email: foundUser.email });
        } else {
          setError('User not found');
        }
      } catch (err) {
        setError('Error loading user');
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/users/${id}`, editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('✅ Profile updated');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update user');
    }
  };

  const handleSend = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/notifications/send', {
        to: user.email,
        message,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('📧 Notification sent');
      setMessage('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to send notification');
    }
  };
  
  const handleDelete = async () => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;

  try {
    const token = localStorage.getItem('token');
    await axios.delete(`/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSuccess('🗑️ User deleted successfully');
    setTimeout(() => {
      navigate('/admin-dashboard');
 // or navigate using useNavigate
    }, 2000);
  } catch (err) {
    setError('Failed to delete user');
  }
};

  if (!user && !error) {
    return <Typography sx={{ p: 4, color: 'white' }}>Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        background: 'linear-gradient(to right, #1a1a2e, #2a003f)',
        color: 'white',
        boxSizing: 'border-box',
        padding: { xs: 3, sm: 5 }
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, mt: 6 }}>
        👤 Manage User
      </Typography>

      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container direction="column" spacing={4}>
        {/* Profile Edit Card */}
        <Grid item>
          <Card
            elevation={6}
            sx={{
              backgroundColor: '#2e2e48',
              color: 'white',
              borderRadius: 3,
              boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
              paddingBottom: 2
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>✏️ Edit Profile</Typography>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                margin="normal"
                InputLabelProps={{ style: { color: '#aaa' } }}
                sx={{ input: { color: 'white' } }}
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                margin="normal"
                InputLabelProps={{ style: { color: '#aaa' } }}
                sx={{ input: { color: 'white' } }}
              />
              <Button variant="contained" onClick={handleUpdate} sx={{ mt: 2 }}>
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Email Notification Card */}
        <Grid item>
          <Card
            elevation={6}
            sx={{
              backgroundColor: '#2e2e48',
              color: 'white',
              borderRadius: 3,
              boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
              paddingBottom: 2
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>📩 Send Notification</Typography>
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={5}
                variant="outlined"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                margin="normal"
                InputLabelProps={{ style: { color: '#aaa' } }}
                sx={{ textarea: { color: 'white' } }}
              />
              <Button variant="contained" color="secondary" onClick={handleSend} sx={{ mt: 2 }}>
                Send Email
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
  <Card
    elevation={6}
    sx={{
      backgroundColor: '#2e2e48',
      color: 'white',
      borderRadius: 3,
      boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
      paddingBottom: 2,
    }}
  >
    <CardContent>
      <Typography variant="h6" gutterBottom>🗑️ Danger Zone</Typography>
      <Button
        variant="contained"
        color="error"
        onClick={handleDelete}
      >
        Delete User
      </Button>
    </CardContent>
  </Card>
</Grid>

      </Grid>
    </Box>
  );
};

export default UserManage;
