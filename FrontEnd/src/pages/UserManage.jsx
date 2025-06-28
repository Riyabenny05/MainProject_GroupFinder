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
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        📧 Manage Notifications for {user.name}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Email: {user.email}
      </Typography>

      <TextField
        fullWidth
        multiline
        rows={4}
        label="Notification Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ mt: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSendNotification}
        sx={{ mt: 2 }}
      >
        Send Notification
      </Button>

      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Notification sent successfully!
        </Alert>
      )}
    </Box>
  );
};

export default UserManage;
