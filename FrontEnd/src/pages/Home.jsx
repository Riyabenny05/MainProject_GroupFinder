import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
  Box,
  Grid,
  Modal,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import StudyGroupCard from "../components/GroupCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import splashVideo from "../assets/Animated_grid.mp4"; // ✅_viedo.mp4"; // ✅ video import

const Home = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState("");
  const { logout } = useAuth();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    const newGroup = {
      _id: Date.now().toString(),
      title: groupName,
      subject: "Custom Group",
      description: `Members: ${members}`,
    };
    setGroups([...groups, newGroup]);
    setGroupName("");
    setMembers("");
    setOpenCreateModal(false);
    handleMenuClose();
  };

  useEffect(() => {
    setGroups([
      {
        _id: "1",
        title: "React Learners",
        subject: "Frontend Development",
        description: "Learn React, hooks, and component design.",
      },
      {
        _id: "2",
        title: "Python Devs",
        subject: "Python Programming",
        description: "Explore Python basics, OOP, and projects.",
      },
      {
        _id: "3",
        title: "Cyber Ninjas",
        subject: "Cybersecurity",
        description: "Learn ethical hacking and CTF challenges.",
      },
    ]);
  }, []);

  const filteredGroups = groups.filter((group) =>
    group.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Global style to remove body scroll and padding */}
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
      `}</style>

      {/* Background Video */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -2,
          overflow: "hidden",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
          }}
        >
          <source src={splashVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Optional dark overlay */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        />
      </Box>

      {/* Foreground Content */}
      <Box
        sx={{
          color: "white",
          minHeight: "100vh",
          width: "100vw",
          position: "relative",
          zIndex: 2,
          overflowY: "auto",
        }}
      >
        {/* Navbar */}
        <AppBar position="static" sx={{ backgroundColor: "#1a1a2e", zIndex: 3 }}>
          <Toolbar>
            <TextField
              size="small"
              placeholder="Search groups"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                backgroundColor: "white",
                borderRadius: 5,
                mr: 4,
                minWidth: "250px",
              }}
            />
            <IconButton color="inherit" onClick={handleMenuClick} sx={{ color: "white" }}>
              <MoreVertIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Menu in Navbar */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={() => setOpenCreateModal(true)}>
            <AddCircleOutlineIcon sx={{ mr: 1 }} /> Create Group
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <NotificationsOffIcon sx={{ mr: 1 }} /> Mute Notifications
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 1 }} /> Logout
          </MenuItem>
        </Menu>

        {/* Page Content */}
        <Box sx={{ px: 4, py: 8 }}>
          <Typography variant="h2" align="center" gutterBottom>
            🎯 Unite to Learn
          </Typography>
          <Typography variant="h5" align="center" sx={{ color: "#DDA0DD", mb: 6 }}>
            Team up! Learn fast! Reach farther!...👥
          </Typography>

          {/* Create Group Button */}
          <Box display="flex" justifyContent="center" mb={6}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => setOpenCreateModal(true)}
            >
              Create New Group
            </Button>
          </Box>

          {/* Group Cards */}
          <Grid container spacing={6} justifyContent="center">
            {filteredGroups.length === 0 ? (
              <Typography variant="body1" color="gray">
                No groups found.
              </Typography>
            ) : (
              filteredGroups.map((group) => (
                <Grid item key={group._id} xs={12} sm={6} md={4} lg={3}>
                  <StudyGroupCard
                    groupId={group._id}
                    title={group.title}
                    subject={group.subject}
                    description={group.description}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Box>

        {/* Create Group Modal */}
        <Modal open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "white",
              color: "black",
              p: 4,
              borderRadius: 2,
              zIndex: 1000,
            }}
          >
            <Typography variant="h6" mb={2}>
              Create a New Group
            </Typography>
            <form onSubmit={handleCreateGroup}>
              <TextField
                label="Group Name"
                fullWidth
                required
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                margin="normal"
              />
              <TextField
                label="Members (comma separated)"
                fullWidth
                value={members}
                onChange={(e) => setMembers(e.target.value)}
                margin="normal"
              />
              <Button type="submit" variant="contained" color="secondary" sx={{ mt: 2 }}>
                Create Group
              </Button>
            </form>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default Home;
