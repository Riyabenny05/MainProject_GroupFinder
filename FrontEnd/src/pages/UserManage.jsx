import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';

const UserManage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Simulated fetch - Replace with actual fetch call
    const users = [
      { id: 1, name: 'Alice Smith', email: 'alice@example.com' },
      { id: 2, name: 'Bob Johnson', email: 'bob@example.com' },
    ];
    const found = users.find(u => u.id === parseInt(id));
    setUser(found);
  }, [id]);

  const handleSendNotification = () => {
    if (!message.trim()) return;
    // Simulate API call
    console.log(`Send to ${user.email}: ${message}`);
    setSuccess(true);
    setMessage('');
    setTimeout(() => setSuccess(false), 3000);
  };

  if (!user) {
    return <Typography sx={{ p: 4 }}>User not found.</Typography>;
  }

  return (
    <Box sx={{ p: 4, bgcolor: '#1a1a2e', minHeight: '100vh', color: 'white' }}>
      <Typography variant="h5" gutterBottom>
        📧 Manage Notifications for {user.name}
      </Typography>
      <Typography variant="body1" sx={{ color: '#ccc' }} gutterBottom>
         Email: {user.email}
      </Typography>
      <TextField
  fullWidth
  multiline
  rows={4}
  label="Notification Message"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  sx={{
    mt: 2,
    input: { color: 'white' },
    textarea: { color: 'white' },
    '& .MuiInputBase-root': {
      backgroundColor: '#2e2e48',
    },
    '& .MuiInputLabel-root': {
      color: '#aaa',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#444',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#666',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#888',
    },
  }}
/>

    <Button
  variant="contained"
  onClick={handleSendNotification}
  sx={{
    mt: 2,
    backgroundColor: '#5271ff',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#4156cc',
    },
  }}
>
  Send Notification
</Button>
      {success && (
  <Alert
    severity="success"
    sx={{
      mt: 2,
      bgcolor: '#2e4d2e',
      color: '#d2ffd2',
      border: '1px solid #4caf50',
    }}
  >
    Notification sent successfully!
  </Alert>
)}
    </Box>
  );
};

export default UserManage;
