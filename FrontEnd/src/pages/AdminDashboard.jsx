import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  useTheme,
  Alert,
  CircularProgress,
  TextField,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

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
        const groupRes = await axios.get("/admin/groups", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userRes = await axios.get("/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

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
      await axios.patch(`/admin/groups/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGroups(prev => prev.map(g => g._id === id ? { ...g, approved: true, rejected: false } : g));
    } catch (err) {
      alert("Approval failed");
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`/admin/groups/${id}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGroups(prev => prev.map(g => g._id === id ? { ...g, approved: false, rejected: true } : g));
    } catch (err) {
      alert("Rejection failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/groups/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGroups(prev => prev.filter(g => g._id !== id));
    } catch (err) {
      alert("Failed to delete group");
    }
  };
  
  const handleViewGroup = (id) => {
    navigate(`/group/${id}`);
  };

  const handleManageUser = (id) => {
    navigate(`/admin/users/${id}`);
  };
  

  let filteredGroups = groups.filter(group =>
    group.title?.toLowerCase().includes(groupSearch.toLowerCase())
  );

  if (sortOption === 'newest') {
    filteredGroups = [...filteredGroups].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sortOption === 'oldest') {
    filteredGroups = [...filteredGroups].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sortOption === 'approved') {
    filteredGroups = [...filteredGroups].sort((a, b) => b.approved - a.approved);
  } else if (sortOption === 'pending') {
    filteredGroups = [...filteredGroups].sort((a, b) => a.approved - b.approved);
  }

  const filteredUsers = users.filter(user =>
    user.name.includes(userSearch) || user.email.includes(userSearch)
  );

  if (loading) {
    return (
      <Box sx={{ p: isMobile ? 2 : 4, textAlign: 'center', color: 'white' }}>
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant="h6">Loading Admin Data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: isMobile ? 2 : 4, textAlign: 'center', color: 'white' }}>
        <Alert severity="error">{error}</Alert>
        <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflowY: 'auto',
        background: 'linear-gradient(to bottom right, #1a1a2e, #2a003f)',
        color: 'white',
        boxSizing: 'border-box',
        padding: '80px 24px 48px'
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>🛠 Admin Dashboard</Typography>

      <Grid container spacing={2} justifyContent="space-between" alignItems="stretch" sx={{ mb: 4 }}>
        {[{
          label: 'Total Groups', value: groups.length, icon: '👥'
        }, {
          label: 'Approved Groups', value: groups.filter(g => g.approved).length, icon: '✅'
        }, {
          label: 'Pending Groups', value: groups.filter(g => !g.approved && !g.rejected).length, icon: '⏳'
        }, {
          label: 'Registered Users', value: users.length, icon: '📋'
        }].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={6} sx={{ height: '100%', backgroundColor: '#2e2e48', color: 'white', borderRadius: 3 }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.95rem', fontWeight: 600 }}>{item.icon} {item.label}</Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ mb: 3, borderColor: '#555' }} />
      <Box
  sx={{
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 2,
    mb: 3,
  }}
>
  <TextField
    variant="outlined"
    size="small"
    label="Search Groups"
    value={groupSearch}
    onChange={(e) => setGroupSearch(e.target.value)}
    InputProps={{
      style: { color: 'white', backgroundColor: '#3a3a5a' },
    }}
    InputLabelProps={{ style: { color: '#aaa' } }}
  />

  <FormControl size="small" sx={{ minWidth: 160 }}>
    <InputLabel sx={{ color: '#aaa' }}>Sort By</InputLabel>
    <Select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      label="Sort By"
      sx={{
        color: 'white',
        backgroundColor: '#3a3a5a',
        '& .MuiSvgIcon-root': { color: 'white' },
      }}
    >
      <MenuItem value="">None</MenuItem>
      <MenuItem value="newest">Newest</MenuItem>
      <MenuItem value="oldest">Oldest</MenuItem>
      <MenuItem value="approved">Approved</MenuItem>
      <MenuItem value="pending">Pending</MenuItem>
    </Select>
  </FormControl>
</Box>

      <Card sx={{ backgroundColor: '#2e2e48', color: 'white', mb: 5 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>📘 Study Group Management</Typography>
          <TableContainer component={Paper} sx={{ backgroundColor: 'transparent' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>Group Name</TableCell>
                  <TableCell sx={{ color: 'white' }}>Members</TableCell>
                  <TableCell sx={{ color: 'white' }}>Status</TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredGroups.map(group => (
                  <TableRow key={group._id}>
                    <TableCell sx={{ color: 'white' }}>{group.title}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{group.members.length}</TableCell>
                    <TableCell sx={{ color: group.approved ? '#00e676' : group.rejected ? 'red' : '#ffb74d', fontWeight: 600 }}>
                      {group.approved ? 'Approved' : group.rejected ? 'Rejected' : 'Pending'}
                    </TableCell>
                    <TableCell align="center">
                      <Grid container spacing={1} justifyContent="center">
                        <Grid item>
                          <Button size="small" variant="contained" sx={{ backgroundColor: '#1E3A8A', color: 'white' }} onClick={() => handleViewGroup(group._id)}>View</Button>
                        </Grid>
                        <Grid item>
                          <Button size="small" variant="contained" sx={{ backgroundColor: '#14532D', color: 'white' }} onClick={() => handleApprove(group._id)} disabled={group.approved}>Approve</Button>
                        </Grid>
                        <Grid item>
                          <Button size="small" variant="contained" sx={{ backgroundColor: 'orange', color: 'white' }} onClick={() => handleReject(group._id)} disabled={group.rejected}>Reject</Button>
                        </Grid>
                        <Grid item>
                          <Button size="small" variant="contained" sx={{ backgroundColor: '#7F1D1D', color: 'white' }} onClick={() => handleDelete(group._id)}>Delete</Button>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Card sx={{ backgroundColor: '#2e2e48', color: 'white', mb: 5 }}>
  <CardContent>
    <Typography variant="h6" gutterBottom>👥 Registered Users</Typography>

    {/* Optional: User Search Input */}
    <TextField
      variant="outlined"
      size="small"
      label="Search Users"
      value={userSearch}
      onChange={(e) => setUserSearch(e.target.value)}
      InputProps={{
        style: { color: 'white', backgroundColor: '#3a3a5a' },
      }}
      InputLabelProps={{ style: { color: '#aaa' } }}
      sx={{ mb: 2 }}
    />

    <TableContainer component={Paper} sx={{ backgroundColor: 'transparent' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>Name</TableCell>
            <TableCell sx={{ color: 'white' }}>Email</TableCell>
            <TableCell sx={{ color: 'white' }}>Registered At</TableCell>
            <TableCell align="center" sx={{ color: 'white' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user._id}>
              <TableCell sx={{ color: 'white' }}>{user.name}</TableCell>
              <TableCell sx={{ color: 'white' }}>{user.email}</TableCell>
              <TableCell sx={{ color: 'white' }}>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
              <TableCell align="center">
                <Button
                  size="small"
                  variant="contained"
                  sx={{ backgroundColor: '#7C5B82', color: 'white' }}
                  onClick={() => handleManageUser(user._id)}
                >
                  Manage
                </Button>
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
