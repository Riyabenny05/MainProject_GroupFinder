import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Divider, List, ListItem, ListItemText } from '@mui/material';
import { useLocation } from 'react-router-dom';

const GroupDetails = () => {
  const { state } = useLocation();
  const { title, subject, description, groupId } = state || {};

  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const [materials, setMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState('');

  const [members] = useState(['Riya Benny', 'Neha M.', 'Aarav P.', 'Sam R.']);

  const handleSendMessage = () => {
    if (newMsg.trim() === '') return;
    setMessages([...messages, { text: newMsg, sender: 'You' }]);
    setNewMsg('');
  };

  const handleAddMaterial = () => {
    if (newMaterial.trim() === '') return;
    setMaterials([...materials, { link: newMaterial, uploader: 'You' }]);
    setNewMaterial('');
  };

  return (
    <Box sx={{ p: 4, color: 'white', backgroundColor: 'black', minHeight: '100vh' }}>
      <Typography variant="h4" color="plum" gutterBottom>📘 {title}</Typography>
      <Typography variant="subtitle1">Subject: {subject}</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>{description}</Typography>
      <Typography variant="caption" color="gray">Group ID: {groupId}</Typography>

      <Divider sx={{ my: 4, bgcolor: 'gray' }} />

      {/* Members */}
      <Typography variant="h6" sx={{ mb: 1 }}>👥 Members</Typography>
      <List sx={{ maxWidth: 300 }}>
        {members.map((m, idx) => (
          <ListItem key={idx} sx={{ pl: 0 }}>
            <ListItemText primary={m} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 4, bgcolor: 'gray' }} />

      {/* Chat Section */}
      <Typography variant="h6">💬 Group Messages</Typography>
      <Box sx={{ maxWidth: 600, mt: 2 }}>
        {messages.map((msg, idx) => (
          <Typography key={idx} sx={{ mb: 1 }}>
            <strong>{msg.sender}:</strong> {msg.text}
          </Typography>
        ))}
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          placeholder="Type your message..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          sx={{ mt: 2, backgroundColor: 'white', borderRadius: 1 }}
        />
        <Button onClick={handleSendMessage} sx={{ mt: 1 }} variant="contained">Send</Button>
      </Box>

      <Divider sx={{ my: 4, bgcolor: 'gray' }} />

      {/* Materials */}
      <Typography variant="h6">📂 Study Materials</Typography>
      <Box sx={{ maxWidth: 600, mt: 2 }}>
        {materials.map((mat, idx) => (
          <Typography key={idx} sx={{ mb: 1 }}>
            <a href={mat.link} target="_blank" rel="noreferrer" style={{ color: '#90caf9' }}>
              {mat.link}
            </a> <em>by {mat.uploader}</em>
          </Typography>
        ))}
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          placeholder="Paste material link (eg. Google Drive, PDF, Docs...)"
          value={newMaterial}
          onChange={(e) => setNewMaterial(e.target.value)}
          sx={{ mt: 2, backgroundColor: 'white', borderRadius: 1 }}
        />
        <Button onClick={handleAddMaterial} sx={{ mt: 1 }} variant="contained">Add Material</Button>
      </Box>
    </Box>
  );
};

export default GroupDetails;
