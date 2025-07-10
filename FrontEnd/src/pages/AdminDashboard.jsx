import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, useMediaQuery, useTheme, Alert, CircularProgress,
  TextField, Divider, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import {
  Group as GroupIcon, CheckCircle as CheckCircleIcon,
  HourglassEmpty as HourglassEmptyIcon, People as PeopleIcon,
  Visibility as VisibilityIcon, Done as DoneIcon, Close as CloseIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

const AdminDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupSearch, setGroupSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const [groupRes, userRes] = await Promise.all([
          axios.get("/admin/groups", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/admin/users", { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setGroups(groupRes.data);
        setUsers(userRes.data);
      } catch (err) {
        console.error('Failed to fetch admin data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`/admin/groups/${id}/approve`, {}, { headers: { Authorization: `Bearer ${token}` } });
      setGroups(prev => prev.map(g => g._id === id ? { ...g, approved: true, rejected: false } : g));
    } catch {
      alert("Approval failed");
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`/admin/groups/${id}/reject`, {}, { headers: { Authorization: `Bearer ${token}` } });
      setGroups(prev => prev.map(g => g._id === id ? { ...g, approved: false, rejected: true } : g));
    } catch {
      alert("Rejection failed");
    }
  };

  const handleViewGroup = (group) => {
    navigate(`/group/${group._id}`, {
      state: {
        title: group.title,
        subject: group.subject,
        description: group.description,
        groupId: group._id,
      },
    });
  };

  const handleManageUser = (id) => navigate(`/admin/users/${id}`);

  const filteredGroups = [...groups]
    .filter(group => group.title?.toLowerCase().includes(groupSearch.toLowerCase()))
    .sort((a, b) => {
      switch (sortOption) {
        case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt);
        case 'approved': return (b.approved - a.approved);
        case 'pending': return (a.approved - b.approved);
        default: return 0;
      }
    });

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>Loading Admin Dashboard...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Alert severity="error">{error}</Alert>
        <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, background: '#1a1a2e', minHeight: '100vh', color: 'white' }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">🛠 Admin Dashboard</Typography>

      {/* STAT CARDS */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Total Groups', value: groups.length, icon: <GroupIcon />, color: '#6c757d' },
          { label: 'Approved Groups', value: groups.filter(g => g.approved).length, icon: <CheckCircleIcon />, color: '#218838' },
          { label: 'Pending Groups', value: groups.filter(g => !g.approved && !g.rejected).length, icon: <HourglassEmptyIcon />, color: '#ffc107' },
          { label: 'Registered Users', value: users.length, icon: <PeopleIcon />, color: '#5c63b5' }
        ].map((item, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card sx={{ backgroundColor: '#2a2a3c', borderLeft: `6px solid ${item.color}`, borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {item.icon}
                  <Typography>{item.label}</Typography>
                </Box>
                <Typography variant="h5" fontWeight="bold">{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* GROUP MANAGEMENT */}
      <Card sx={{ backgroundColor: '#2a2a3c', mb: 4 }}>
        <CardContent>
          <Typography variant="h6">📘 Study Group Management</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, my: 2 }}>
            <TextField label="Search Groups" variant="outlined" size="small" value={groupSearch} onChange={(e) => setGroupSearch(e.target.value)} />
            <FormControl size="small">
              <InputLabel>Sort By</InputLabel>
              <Select value={sortOption} onChange={(e) => setSortOption(e.target.value)} label="Sort By">
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="oldest">Oldest</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TableContainer component={Paper} sx={{ backgroundColor: 'transparent' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Group Name</TableCell>
                  <TableCell>Members</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredGroups.map(group => (
                  <TableRow key={group._id}>
                    <TableCell>{group.title}</TableCell>
                    <TableCell>{group.members.length}</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: group.approved ? '#00e676' : group.rejected ? 'red' : '#ffb74d' }}>
                      {group.approved ? 'Approved' : group.rejected ? 'Rejected' : 'Pending'}
                    </TableCell>
                    <TableCell>
                      <Button size="small" onClick={() => handleViewGroup(group)} startIcon={<VisibilityIcon />}>View</Button>
                      <Button size="small" onClick={() => handleApprove(group._id)} disabled={group.approved} startIcon={<DoneIcon />}>Approve</Button>
                      <Button size="small" onClick={() => handleReject(group._id)} disabled={group.rejected} startIcon={<CloseIcon />}>Reject</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* USER MANAGEMENT */}
      <Card sx={{ backgroundColor: '#2a2a3c' }}>
        <CardContent>
          <Typography variant="h6">👥 User Management</Typography>
          <TextField
            label="Search Users"
            variant="outlined"
            size="small"
            fullWidth
            sx={{ my: 2 }}
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
          />
          <TableContainer component={Paper} sx={{ backgroundColor: 'transparent' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Button size="small" startIcon={<SettingsIcon />} onClick={() => handleManageUser(user._id)}>Manage</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminDashboard;
