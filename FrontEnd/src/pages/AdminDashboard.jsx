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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedGroups = [
          { id: 1, name: 'React Devs', status: 'Pending', members: 5, createdAt: '2025-05-01' },
          { id: 2, name: 'AI Enthusiasts', status: 'Approved', members: 12, createdAt: '2025-04-15' },
          { id: 3, name: 'Data Science', status: 'Pending', members: 8, createdAt: '2025-05-20' },
          { id: 4, name: 'Web Dev Fundamentals', status: 'Approved', members: 10, createdAt: '2025-03-10' },
        ];

        const fetchedUsers = [
          { id: 1, name: 'Alice Smith', email: 'alice@example.com', registeredAt: '2025-02-01' },
          { id: 2, name: 'Bob Johnson', email: 'bob@example.com', registeredAt: '2025-02-10' },
          { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', registeredAt: '2025-03-05' },
          { id: 4, name: 'Diana Prince', email: 'diana@example.com', registeredAt: '2025-04-22' },
        ];

        await new Promise(resolve => setTimeout(resolve, 500));

        setGroups(fetchedGroups);
        setUsers(fetchedUsers);
      } catch (err) {
        console.error('Failed to fetch admin data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleApprove = (id) => {
    setGroups(prev =>
      prev.map(g => (g.id === id ? { ...g, status: 'Approved' } : g))
    );
  };

  const handleDelete = (id) => {
    setGroups(prev => prev.filter(g => g.id !== id));
  };

  const handleViewGroup = (id) => {
    navigate(`/group/${id}`);
  };

  const handleManageUser = (id) => {
    navigate(`/admin/users/${id}`);
  };

  if (loading) {
    return (
      <Box sx={{ p: isMobile ? 2 : 4, textAlign: 'center' }}>
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant="h6">Loading Admin Data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: isMobile ? 2 : 4, textAlign: 'center' }}>
        <Alert severity="error">{error}</Alert>
        <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: isMobile ? 2 : 4 }}>
      <Typography variant="h4" gutterBottom>
        🛠 Admin Dashboard
      </Typography>

      <Grid container spacing={2} columns={12} sx={{ mb: 4 }}>
        <Grid span={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="primary">Total Groups</Typography>
              <Typography variant="h4">{groups.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid span={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="success.main">Approved Groups</Typography>
              <Typography variant="h4">
                {groups.filter(g => g.status === 'Approved').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid span={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="warning.main">Pending Groups</Typography>
              <Typography variant="h4">
                {groups.filter(g => g.status === 'Pending').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid span={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="info.main">Registered Users</Typography>
              <Typography variant="h4">{users.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mb: 4 }} elevation={3}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Study Group Management
          </Typography>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Group Name</TableCell>
                  <TableCell>Members</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groups.map(group => (
                  <TableRow key={group.id}>
                    <TableCell>{group.name}</TableCell>
                    <TableCell>{group.members}</TableCell>
                    <TableCell>{group.status}</TableCell>
                    <TableCell align="center">
                      <Grid container spacing={1} justifyContent="center">
                        <Grid span={4}>
                          <Button
                            size="small"
                            variant="contained"
                            color="info"
                            onClick={() => handleViewGroup(group.id)}
                          >
                            View
                          </Button>
                        </Grid>
                        <Grid span={4}>
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            onClick={() => handleApprove(group.id)}
                            disabled={group.status === 'Approved'}
                          >
                            Approve
                          </Button>
                        </Grid>
                        <Grid span={4}>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            onClick={() => handleDelete(group.id)}
                          >
                            Delete
                          </Button>
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

      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Registered Users
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Registered At</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.registeredAt}</TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={() => handleManageUser(user.id)}
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
