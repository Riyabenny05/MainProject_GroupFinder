import React from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline } from '@mui/material';
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Splash from './pages/Splash'; 
import Home from "./pages/Home";
import GroupCard from "./components/GroupCard";
import GroupDetails from "./pages/GroupDetails";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from './routes/AdminRoute';
import UserRoute from './routes/UserRoute';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Box from '@mui/material/Box';
import Profile from './pages/Profile'; 
// 🔴 Make sure these are created and exported properly
import UserManage from './pages/UserManage'; 
import Unauthorized from './pages/Unauthorized';


function App() {
  return (
    <AuthProvider>
      <CssBaseline />
      <Navbar />
      <Box sx={{ pt: '64px' }}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/groupcard" element={<GroupCard />} />
        <Route path="/group/:id" element={<GroupDetails />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
       <Route path="/profile" element={<Profile />} />
<Route path="/admin-dashboard/group/:id" element={<GroupDetails />} />
        {/* Admin Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users/:id"
          element={
            <AdminRoute>
              <UserManage />
            </AdminRoute>
          }
        />

      </Routes>
      </Box>
    </AuthProvider>
  );
}

export default App;