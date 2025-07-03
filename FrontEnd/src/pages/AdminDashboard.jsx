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

        const [groupRes, userRes] = await Promise.all([
          axios.get("/groups/all", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/users", { headers: { Authorization: `Bearer ${token}` } }),
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
      await axios.post(`/admin/groups/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGroups(prev => prev.map(g => (g._id === id ? { ...g, approved: true, rejected: false } : g)));
    } catch (err) {
      console.error("Failed to approve group", err);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`/admin/groups/${id}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGroups(prev => prev.map(g => (g._id === id ? { ...g, approved: false, rejected: true } : g)));
    } catch (err) {
      console.error("Failed to reject group", err);
    }
  };

  const handleViewGroup = (id) => {
    navigate(`/group/${id}`);
  };

  const handleManageUser = (id) => {
    navigate(`/admin/users/${id}`);
  };

  const filteredGroups = groups.filter(group =>
    group.title?.toLowerCase().includes(groupSearch.toLowerCase())
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

      <Divider sx={{ my: 3, borderColor: '#555' }} />

      <Card sx={{ backgroundColor: '#2e2e48', color: 'white', mb: 5 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>📘 Pending Study Groups</Typography>
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
                    <TableCell sx={{ color: 'white' }}>{group.members?.length || 0}</TableCell>
                    <TableCell sx={{ color: group.approved ? '#00e676' : group.rejected ? '#ff4d4d' : '#ffb74d', fontWeight: 600 }}>
                      {group.approved ? "Approved" : group.rejected ? "Rejected" : "Pending"}
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
                          <Button size="small" variant="contained" sx={{ backgroundColor: '#7F1D1D', color: 'white' }} onClick={() => handleReject(group._id)} disabled={group.rejected}>Reject</Button>
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
    </Box>
  );
};

export default AdminDashboard;
