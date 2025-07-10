import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GroupDetails from './pages/GroupDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard'; // if you have one

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/group-details" element={<GroupDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
};

export default App;
