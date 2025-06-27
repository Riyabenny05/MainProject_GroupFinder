import React, { useState } from 'react';
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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const [groups, setGroups] = useState([
    { id: 1, name: 'React Devs', status: 'Pending' },
    { id: 2, name: 'AI Enthusiasts', status: 'Approved' },
    { id: 3, name: 'Data Science', status: 'Pending' },
  ]);

  const [users] = useState([
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ]);

  const handleApprove = (id) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, status: 'Approved' } : g))
    );
  };

  const handleDelete = (id) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
  };

  const handleViewGroup = (id) => {
    navigate(`/group/${id}`);
  };

  return (
    <Box sx={{ p: isMobile ? 2 : 4 }}>
      <Typography variant="h4" gutterBottom>
        🛠 Admin Dashboard
      </Typography>

      {/* Group Management */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Study Group Management
          </Typography>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Group Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groups.map((group) => (
                  <TableRow key={group.id}>
                    <TableCell>{group.name}</TableCell>
                    <TableCell>{group.status}</TableCell>
                    <TableCell align="center">
                      <Grid container spacing={1} justifyContent="center">
                        <Grid item>
                          <Button
                            size="small"
                            variant="contained"
                            color="info"
                            onClick={() => handleViewGroup(group.id)}
                          >
                            View
                          </Button>
                        </Grid>
                        <Grid item>
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
                        <Grid item>
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

      {/* Registered Users */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Registered Users
          </Typography>
          <Grid container spacing={isMobile ? 1 : 3}>
            {users.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="subtitle1">{user.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminDashboard;
