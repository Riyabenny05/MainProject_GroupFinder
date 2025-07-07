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
import splashVideo from "../assets/Animated_grid.mp4";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from "../utils/axios";

const dummyGroups = [
  {
    _id: "d1",
    title: "Web Wizards",
    subject: "HTML, CSS, JS",
    description: "Master the web basics together!",
  },
  {
    _id: "d2",
    title: "Java Juggernauts",
    subject: "Java Programming",
    description: "From OOP to Spring Boot!",
  },
  {
    _id: "d3",
    title: "AI Agents Squad",
    subject: "Artificial Intelligence",
    description: "LLMs, Agents & beyond!",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState("");
  const [subject, setSubject] = useState("");
  const { logout, user } = useAuth();

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const newGroup = {
        title: groupName,
        subject,
        description: `Members: ${members}`,
      };
      const token = localStorage.getItem("token");
      const res = await axios.post("/groups", newGroup, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const createdGroup = res.data;
      setGroups((prev) => [...prev, createdGroup]); // ✅ Only add the new group
      setGroupName("");
      setSubject("");
      setMembers("");
      setOpenCreateModal(false);
      handleMenuClose();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to create group.");
    }
  };

  const handleDeleteGroup = async (groupId) => {
    const confirm = window.confirm("Are you sure you want to delete this group?");
    if (!confirm) return;

    try {
      if (groupId.startsWith("d")) {
        setGroups((prev) => prev.filter((g) => g._id !== groupId));
        return;
      }

      const token = localStorage.getItem("token");
      await axios.delete(`/groups/${groupId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGroups((prev) => prev.filter((g) => g._id !== groupId));
      alert("Group deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete group.");
    }
  };

  const handleJoinGroup = (group) => {
    navigate("/group-details", { state: group });
  };

  const handleProfile = () => {
    navigate("/profile", { state: user });
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/groups", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const approvedGroups = res.data.filter(group => {
  if (group.rejected) {
    alert("❌ Sorry! Your group is rejected by admin.");
    return false;
  }
  return group.approved;
});
setGroups([...approvedGroups, ...dummyGroups]);

        setGroups([...res.data, ...dummyGroups]);
      } catch (err) {
        console.error("Failed to fetch groups", err);
        setGroups(dummyGroups);
      }
      const res = await axios.get("/groups");
setGroups([...res.data.filter(g => g.approved), ...dummyGroups]);

    };
    fetchGroups();
  }, []);

  const filteredGroups = groups.filter((group) =>
    group.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <style>{`html, body { margin: 0; padding: 0; overflow: hidden; }`}</style>
      <Box sx={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -2 }}>
        <video autoPlay muted loop playsInline style={{ width: "100vw", height: "100vh", objectFit: "cover" }}>
          <source src={splashVideo} type="video/mp4" />
        </video>
        <Box sx={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1 }} />
      </Box>

      <Box sx={{ color: "white", minHeight: "100vh", position: "relative", zIndex: 2, overflowY: "auto" }}>
        <AppBar position="static" sx={{ backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(15px)", borderBottom: "0.5px solid rgba(255,255,255,0.1)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", zIndex: 3 }}>
          <Toolbar>
            <TextField
              size="small"
              placeholder="Search groups"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: 5, mr: 4, minWidth: "250px" }}
            />
            <IconButton color="inherit" onClick={handleMenuClick} sx={{ color: "white" }}>
              <MoreVertIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleProfile}>< AccountCircleIcon sx={{ mr: 1 }} /> Profile</MenuItem>
          <MenuItem onClick={() => setOpenCreateModal(true)}><AddCircleOutlineIcon sx={{ mr: 1 }} /> Create Group</MenuItem>
          <MenuItem onClick={handleMenuClose}><NotificationsOffIcon sx={{ mr: 1 }} /> Mute Notifications</MenuItem>
          <MenuItem onClick={handleLogout}><LogoutIcon sx={{ mr: 1 }} /> Logout</MenuItem>
        </Menu>

        <Box sx={{ px: 4, py: 8 }}>
          <Typography variant="h2" align="center" gutterBottom>🎯 Unite to Learn</Typography>
          <Typography variant="h5" align="center" sx={{ color: "#DDA0DD", mb: 6 }}>Team up! Learn fast! Reach farther!...👥</Typography>

          <Box display="flex" justifyContent="center" mb={6}>
            <Button variant="contained" color="secondary" startIcon={<AddCircleOutlineIcon />} onClick={() => setOpenCreateModal(true)}>
              Create New Group
            </Button>
          </Box>

          <Grid container spacing={6} justifyContent="center">
            {filteredGroups.length === 0 ? (
              <Typography variant="body1" color="gray">No groups found.</Typography>
            ) : (
              filteredGroups.map((group) => (
                <Grid item key={group._id} xs={12} sm={6} md={4} lg={3}>
                  <StudyGroupCard
                    {...group}
                    onJoin={() => handleJoinGroup(group)}
                    onDelete={() => handleDeleteGroup(group._id)}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Box>

        <Modal open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "white", color: "black", p: 4, borderRadius: 2 }}>
            <Typography variant="h6" mb={2}>Create a New Group</Typography>
            <form onSubmit={handleCreateGroup}>
              <TextField label="Group Name" fullWidth required value={groupName} onChange={(e) => setGroupName(e.target.value)} margin="normal" />
              <TextField label="Subject" fullWidth required value={subject} onChange={(e) => setSubject(e.target.value)} margin="normal" />
              <TextField label="Members (comma separated)" fullWidth value={members} onChange={(e) => setMembers(e.target.value)} margin="normal" />
              <Button type="submit" variant="contained" color="secondary" sx={{ mt: 2 }}>Create Group</Button>
            </form>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default Home;