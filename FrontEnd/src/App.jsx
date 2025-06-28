import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import GroupCard from "./components/GroupCard";
import GroupDetails from "./pages/GroupDetails";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from './routes/AdminRoute';
import UserRoute from './routes/UserRoute';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

// 🔴 Make sure these are created and exported properly
import UserManage from './pages/UserManage'; 
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/groupcard" element={<GroupCard />} />
        <Route path="/group/:id" element={<GroupDetails />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

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

        {/* Optional User Protected Routes (Uncomment if needed) */}
        {/* 
        <Route
          path="/user-dashboard"
          element={
            <UserRoute>
              <UserDashboard />
            </UserRoute>
          }
        />
        */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
