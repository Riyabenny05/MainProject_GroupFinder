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
    setGroups(prev => prev.map(g => (g.id === id ? { ...g, status: 'Approved' } : g)));
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
    minHeight: '100vh',
    width: '100vw',
    position: 'absolute',
    top: 0,
    left: 0,
    background: 'linear-gradient(to bottom right, #2a003f, #1a1a2e)',
    color: 'transparent',
    padding: '80px 24px 24px', // Top padding for AppBar + page padding
    boxSizing: 'border-box',
    overflowX: 'hidden',
  }}
>


      <Typography variant="h4" gutterBottom>
        🛠 Admin Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid
  container
  spacing={2}
  justifyContent="space-between"
  alignItems="stretch"
  sx={{ mb: 4 }}
>
  {[
    { label: 'Total Groups', value: groups.length, icon: '👥' },
    { label: 'Approved Groups', value: groups.filter(g => g.status === 'Approved').length, icon: '✅' },
    { label: 'Pending Groups', value: groups.filter(g => g.status === 'Pending').length, icon: '⏳' },
    { label: 'Registered Users', value: users.length, icon: '📋' }
  ].map((item, index) => (
    <Grid item xs={12} sm={6} md={3} key={index}>
      <Card
        elevation={4}
        sx={{
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          color: 'white',
        }}
      >
        <CardContent>
          <Typography
            variant="subtitle2"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontSize: '0.9rem',
              fontWeight: 500,
            }}
          >
            {item.icon} {item.label}
          </Typography>
          <Typography variant="h4">{item.value}</Typography>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>


      {/* Groups Table */}
      <Card
  elevation={4}
  sx={{
    mb: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
  }}
>
  <CardContent>
    <Typography variant="h6" gutterBottom>
      📘 Study Group Management
    </Typography>

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
          {groups.map(group => (
            <TableRow key={group.id}>
              <TableCell sx={{ color: 'white' }}>{group.name}</TableCell>
              <TableCell sx={{ color: 'white' }}>{group.members}</TableCell>
              <TableCell sx={{ color: 'white' }}>{group.status}</TableCell>
              <TableCell align="center">
                <Grid container spacing={1} justifyContent="center">
                  <Grid item>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{ backgroundColor: '#1E3A8A', color: 'white' }}
                      onClick={() => handleViewGroup(group.id)}
                    >
                      View
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{ backgroundColor: '#14532D', color: 'white' }}
                      onClick={() => handleApprove(group.id)}
                      disabled={group.status === 'Approved'}
                    >
                      Approve
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{ backgroundColor: '#7F1D1D', color: 'white' }}
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


      {/* Users Table */}
      <Card
  elevation={4}
  sx={{
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
  }}
>
  <CardContent>
    <Typography variant="h6" gutterBottom>
      👥 Registered Users
    </Typography>

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
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell sx={{ color: 'white' }}>{user.name}</TableCell>
              <TableCell sx={{ color: 'white' }}>{user.email}</TableCell>
              <TableCell sx={{ color: 'white' }}>{user.registeredAt}</TableCell>
              <TableCell align="center">
                <Button
                  size="small"
                  variant="contained"
                  sx={{ backgroundColor: '#7C5B82', color: 'white' }}
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
