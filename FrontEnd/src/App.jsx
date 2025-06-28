// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import GroupCard from './components/GroupCard';
import GroupDetails from './pages/GroupDetails';
import AdminDashboard from './pages/AdminDashboard';
import UserManage from './pages/UserManage';
import Unauthorized from './pages/Unauthorized';

import AdminRoute from './routes/AdminRoute';
import UserRoute from './routes/UserRoute';
import ProtectedRoute from './components/ProtectedRoute'; // still useful for shared protection
import { AuthProvider } from './context/AuthContext';

import './App.css';

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

        {/* Protected Admin Routes */}
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

        {/* Optional Protected User Routes (wrap if needed) */}
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

        {/* Unauthorized Fallback */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
