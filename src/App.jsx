// App.jsx
import React from 'react';
import Navbar from './components/Navbar';

import Login from './pages/Login';
import GroupCard from './components/GroupCard';
import Home from './pages/Home';

import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/groupcard" element={<GroupCard />} />
      </Routes>
    </div>
  );
}

export default App;
