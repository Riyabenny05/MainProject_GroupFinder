

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
import {
    Group as GroupIcon,
    CheckCircle as CheckCircleIcon,
    HourglassEmpty as HourglassEmptyIcon,
    People as PeopleIcon,
    Visibility as VisibilityIcon,
    Done as DoneIcon,
    Close as CloseIcon,
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
    const [sortOption, setSortOption] = useState('newest');

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

    const handleApiCall = async (apiCall, successCallback, failureMessage) => {
        try {
            const token = localStorage.getItem("token");
            await apiCall(token);
            successCallback();
        } catch (err) {
            alert(failureMessage);
        }
    };

    const handleApprove = (id) => handleApiCall(
        (token) => axios.patch(`/admin/groups/${id}/approve`, {}, { headers: { Authorization: `Bearer ${token}` } }),
        () => setGroups(prev => prev.map(g => g._id === id ? { ...g, approved: true, rejected: false } : g)),
        "Approval failed"
    );

    const handleReject = (id) => handleApiCall(
        (token) => axios.patch(`/admin/groups/${id}/reject`, {}, { headers: { Authorization: `Bearer ${token}` } }),
        () => setGroups(prev => prev.map(g => g._id === id ? { ...g, approved: false, rejected: true } : g)),
        "Rejection failed"
    );

    const handleViewGroup = (group) => navigate(`/group/${group._id}`, { state: { ...group } });
    const handleManageUser = (id) => navigate(`/admin/users/${id}`);

    const sortedAndFilteredGroups = [...groups]
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
        user.name.toLowerCase().includes(userSearch.toLowerCase()) || user.email.toLowerCase().includes(userSearch.toLowerCase())
    );

    const statCards = [
    { label: 'Total Groups', value: groups.length, icon: <GroupIcon />, color: '#6c757d' },         // Muted gray
    { label: 'Approved Groups', value: groups.filter(g => g.approved).length, icon: <CheckCircleIcon />, color: '#218838' }, // Deep green
    { label: 'Pending Groups', value: groups.filter(g => !g.approved && !g.rejected).length, icon: <HourglassEmptyIcon />, color: '#ffc107' }, // Amber yellow
    { label: 'Registered Users', value: users.length, icon: <PeopleIcon />, color: '#5c63b5' }      // Muted violet-blue
];



const buttonColors = {
    view: '#3F3C6D',   // Muted Blue-Violet: A mix of blue with a strong violet influence, giving a softer, almost ethereal feel.
    approve: '#1F5E30', // Deep Violet-Green: A very dark green with a subtle hint of purple, making it richer and less "pure" green.
    reject: '#7B2A1C',  // Dark Violet-Red: A deep, rich red with a strong undertone of purple, giving it a more luxurious and serious feel.
    manage: '#55375C'    // Management: A slightly darker, more muted purple, resonating with the background.
};


    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', background: 'linear-gradient(to bottom right, #1a1a2e, #2a003f)' }}>
            <CircularProgress sx={{ color: 'white' }} />
            <Typography variant="h6" sx={{ color: 'white', mt: 2 }}>Loading Dashboard...</Typography>
        </Box>
    );

    if (error) return (
        <Box sx={{ p: 4, textAlign: 'center', color: 'white' }}>
            <Alert severity="error">{error}</Alert>
            <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>Retry</Button>
        </Box>
    );

    return (
        <Box sx={{
        // Add these properties back
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // The rest of the styles remain
        overflowY: 'auto',
        background: 'linear-gradient(to bottom right, #1a1a2e, #2a003f)',
        color: 'white',
        p: isMobile ? 2 : 4,
        pt: 10 // keep some top padding for content
    }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>🛠 Admin Dashboard</Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                {statCards.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{
                            height: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            color: 'white',
                            borderRadius: '12px',
                            borderLeft: `5px solid ${item.color}`,
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: `0 10px 20px rgba(0,0,0,0.2)`
                            }
                        }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    {item.icon}
                                    <Typography variant="subtitle1" fontWeight="600">{item.label}</Typography>
                                </Box>
                                <Typography variant="h3" sx={{ mt: 1, fontWeight: 'bold' }}>{item.value}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <StyledCard>
                <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>📘 Study Group Management</Typography>
                    <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: 2, mb: 3 }}>
                        <StyledTextField label="Search Groups" value={groupSearch} onChange={(e) => setGroupSearch(e.target.value)} />
                        <FormControl size="small" sx={{ minWidth: 180 }}>
                            <InputLabel sx={{ color: '#bbb' }}>Sort By</InputLabel>
                            <Select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                label="Sort By"
                                sx={{ color: 'white', backgroundColor: '#3a3a5a', '& .MuiSvgIcon-root': { color: 'white' } }}
                            >
                                <MenuItem value="newest">Newest</MenuItem>
                                <MenuItem value="oldest">Oldest</MenuItem>
                                <MenuItem value="approved">Status: Approved</MenuItem>
                                <MenuItem value="pending">Status: Pending</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <TableContainer component={Paper} sx={{ backgroundColor: 'transparent' }}>
                        <Table size="small">
                            <TableHead>
                               <TableRow>
                                    {['Group Name', 'Members', 'Status'].map(headCell => (
                                        <TableCell key={headCell} sx={{ color: '#ccc', fontWeight: 'bold' }}>{headCell}</TableCell>
                                    ))}
                                    {/* --- THIS IS THE CHANGE --- */}
                                    <TableCell key="Actions" align="center" sx={{ color: '#ccc', fontWeight: 'bold' }}>Actions</TableCell>
                                    {/* ------------------------- */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedAndFilteredGroups.map(group => (
                                    <TableRow key={group._id} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' } }}>
                                        <TableCell sx={{ color: 'white' }}>{group.title}</TableCell>
                                        <TableCell sx={{ color: 'white' }}>{group.members.length}</TableCell>
                                        <TableCell>
                                            {/* Adjusted colors for a subtle, dim, yet discernible look */}
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 'bold', // Keep bold for emphasis
                                                    color: group.approved
                                                        ? '#7BA37B' // A soft, earthy green
                                                        : (group.rejected
                                                            ? '#B25C5C' // A muted, brick-like red
                                                            : '#C2A44B' // A desaturated, aged gold/yellow
                                                          ),
                                                }}
                                            >
                                                {group.approved ? 'Approved' : group.rejected ? 'Rejected' : 'Pending'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <ActionButton sx={{ backgroundColor: buttonColors.view, '&:hover': { backgroundColor: '#4b52a3' } }} onClick={() => handleViewGroup(group)} startIcon={<VisibilityIcon />}>View</ActionButton>
                                            <ActionButton sx={{ backgroundColor: buttonColors.approve, '&:hover': { backgroundColor: '#1e7e34' } }} onClick={() => handleApprove(group._id)} disabled={group.approved} startIcon={<DoneIcon />}>Approve</ActionButton>
                                            <ActionButton sx={{ backgroundColor: buttonColors.reject, '&:hover': { backgroundColor: '#912f2f' } }} onClick={() => handleReject(group._id)} disabled={group.rejected} startIcon={<CloseIcon />}>Reject</ActionButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </StyledCard>

            <StyledCard>
                <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>👥 User Management</Typography>
                    <StyledTextField label="Search Users by Name or Email" value={userSearch} onChange={(e) => setUserSearch(e.target.value)} sx={{ mb: 2 }} />
                    <TableContainer component={Paper} sx={{ backgroundColor: 'transparent' }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: '#ccc', fontWeight: 'bold' }}>Name</TableCell>
                                    <TableCell sx={{ color: '#ccc', fontWeight: 'bold' }}>Email</TableCell>
                                    <TableCell align="center" sx={{ color: '#ccc', fontWeight: 'bold' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user._id} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' } }}>
                                        <TableCell sx={{ color: 'white' }}>{user.name}</TableCell>
                                        <TableCell sx={{ color: 'white' }}>{user.email}</TableCell>
                                        <TableCell align="center">
                                            <ActionButton
                                                sx={{ backgroundColor: '#7C5B82', '&:hover': { backgroundColor: '#67476D' } }}
                                                onClick={() => handleManageUser(user._id)}
                                                startIcon={<SettingsIcon />}
                                            >
                                                Manage
                                            </ActionButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </StyledCard>
        </Box>
    );
};
// Styled components for reuse and cleaner code
const StyledCard = ({ children, sx }) => (
    <Card sx={{
        backgroundColor: 'rgba(46, 46, 72, 0.7)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        mb: 4,
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        ...sx
    }}>
        {children}
    </Card>
);

const StyledTextField = (props) => (
    <TextField
        variant="outlined"
        size="small"
        fullWidth
        {...props}
        InputProps={{ style: { color: 'white', backgroundColor: '#3a3a5a' } }}
        InputLabelProps={{ style: { color: '#bbb' } }}
    />
);

const ActionButton = ({ children, sx, ...props }) => (
    <Button
        size="small"
        variant="contained"
        sx={{
            m: 0.5,
            textTransform: 'none',
            fontWeight: 600,
            transition: 'transform 0.2s',
            '&:hover': {
                transform: 'scale(1.05)'
            },
            ...sx
        }}
        {...props}
    >
        {children}
    </Button>
);

export default AdminDashboard;