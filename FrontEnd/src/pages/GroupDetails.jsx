import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from 'axios';

const GroupDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location || {};
  const { title, subject, description, groupId } = state || {};

  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const [materials, setMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState('');
  const [members, setMembers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSettingsClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleDeleteGroup = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this group?');
    if (confirmDelete) {
      alert('Group deleted successfully!');
      navigate('/Home');
    }
  };

  const handleSendMessage = async () => {
    if (newMsg.trim() === '') return;
    try {
      await axios.post('/api/messages', {
        groupId,
        content: newMsg,
        type: 'text',
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNewMsg('');
      fetchMessages();
    } catch (err) {
      console.error('Failed to send message:', err);
      alert('Failed to send message');
    }
  };

  const handleAddMaterial = async () => {
    if (newMaterial.trim() === '') return;
    try {
      await axios.post('/api/materials', {
        groupId,
        link: newMaterial,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNewMaterial('');
      fetchMaterials();
    } catch (err) {
      console.error('Failed to add material:', err);
      alert('Failed to add material');
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`/api/messages/${groupId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessages(res.data.length > 0 ? res.data : [
        { content: 'Welcome to the group!', senderId: { name: 'Admin' } },
        { content: "Let's start learning React!", senderId: { name: 'Riya Benny' } },
      ]);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  const fetchMaterials = async () => {
    try {
      const res = await axios.get(`/api/materials/${groupId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMaterials(res.data.length > 0 ? res.data : [
        { link: 'https://reactjs.org', uploaderId: { name: 'Admin' } },
      ]);
    } catch (err) {
      console.error("Failed to fetch materials:", err);
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await axios.get(`/api/groups/${groupId}/members`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMembers(res.data.length > 0 ? res.data : ['Riya Benny', 'Dayona', 'Jofia', 'Karthik']);
    } catch (err) {
      console.error('Failed to fetch members:', err);
    }
  };

  useEffect(() => {
    if (groupId) {
      fetchMessages();
      fetchMaterials();
      fetchMembers();
    }
  }, [groupId]);

  if (!title) {
    return (
      <Box sx={{ color: 'white', backgroundColor: 'black', minHeight: '100vh', p: 4 }}>
        <Typography variant="h6">No group data available. Please try again.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ color: 'white', backgroundColor: 'black', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: '#2e2e2e' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>{title} Settings</Typography>
          <IconButton color="inherit" onClick={handleSettingsClick}>
            <SettingsIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={() => { alert('🔕 Group muted'); handleClose(); }}>🔕 Mute Notifications</MenuItem>
            <MenuItem onClick={handleDeleteGroup}>🗑️ Delete Group</MenuItem>
            <MenuItem onClick={handleClose}>❌ Close</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 4 }}>
        <Typography variant="h4" color="plum" gutterBottom>📘 {title}</Typography>
        <Typography variant="subtitle1">Subject: {subject}</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>{description}</Typography>
        <Typography variant="caption" color="gray">Group ID: {groupId}</Typography>

        <Divider sx={{ my: 4, bgcolor: 'gray' }} />

        <Typography variant="h6" sx={{ mb: 1 }}>👥 Members</Typography>
        <List sx={{ maxWidth: 300 }}>
          {members.map((m, idx) => (
            <ListItem key={idx} sx={{ pl: 0 }}>
              <ListItemText primary={typeof m === 'string' ? m : m.name} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 4, bgcolor: 'gray' }} />

        <Typography variant="h6">💬 Group Messages</Typography>
        <Box sx={{ maxWidth: 600, mt: 2 }}>
          {messages.map((msg, idx) => (
            <Typography key={idx} sx={{ mb: 1 }}>
              <strong>{msg.senderId?.name || msg.sender || 'You'}:</strong> {msg.content || msg.text}
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

        <Typography variant="h6">📂 Study Materials</Typography>
        <Box sx={{ maxWidth: 600, mt: 2 }}>
          {materials.map((mat, idx) => (
            <Typography key={idx} sx={{ mb: 1 }}>
              <a href={mat.link} target="_blank" rel="noreferrer" style={{ color: '#90caf9' }}>
                {mat.link}
              </a> <em>by {mat.uploaderId?.name || mat.uploader || 'You'}</em>
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
    </Box>
  );
};

export default GroupDetails;
