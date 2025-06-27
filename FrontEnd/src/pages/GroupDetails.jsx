import React, { useState } from 'react';
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
  InputAdornment,
  Menu,
  MenuItem
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';

const GroupDetails = () => {
  const { state } = useLocation();
  const { title, subject, description, groupId } = state || {};

  const [messages, setMessages] = useState([
    { text: 'Welcome to the group!', sender: 'Admin' },
    { text: 'Lets start learning React!', sender: 'Riya Benny' }
  ]);
  const [newMsg, setNewMsg] = useState('');
  const [materials, setMaterials] = useState([
    { link: 'https://reactjs.org', uploader: 'Admin' }
  ]);
  const [newMaterial, setNewMaterial] = useState('');
  const [members] = useState(['Riya Benny', 'Dayona', 'Jofia', 'Karthik']);
  const [searchTerm, setSearchTerm] = useState('');

  // Settings Menu State
  const [anchorEl, setAnchorEl] = useState(null);
  const handleSettingsClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

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

  const filteredMessages = messages.filter(msg =>
    msg.text.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredMaterials = materials.filter(mat =>
    mat.link.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ color: 'white', backgroundColor: 'black', minHeight: '100vh' }}>
      {/* Top Navbar with Settings */}
      <AppBar position="static" sx={{ backgroundColor: '#2e2e2e' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>{title} Settings</Typography>
          <IconButton color="inherit" onClick={handleSettingsClick}>
            <SettingsIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={() => { alert('🔕 Group muted'); handleClose(); }}>🔕 Mute Notifications</MenuItem>
            <MenuItem onClick={() => { alert('⚙️ Preferences opened'); handleClose(); }}>⚙️ Preferences</MenuItem>
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

        {/* Group Messages */}
        <Typography variant="h6">💬 Group Messages</Typography>
        <Box sx={{ maxWidth: 600, mt: 2 }}>
          {filteredMessages.map((msg, idx) => (
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

        {/* Study Materials */}
        <Typography variant="h6">📂 Study Materials</Typography>
        <Box sx={{ maxWidth: 600, mt: 2 }}>
          {filteredMaterials.map((mat, idx) => (
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
    </Box>
  );
};

export default GroupDetails;
