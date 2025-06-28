// App.jsx
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import GroupCard from "./components/GroupCard";
import Home from "./pages/Home";
import Animations from "./components/AnimatedGrid";
import GroupDetails from "./pages/GroupDetails";
import AdminDashboard from "./pages/AdminDashboard";
import { Routes, Route } from "react-router-dom";
import "./App.css";

/*******  b8e7723b-6042-46bd-9908-ad8bf812a1c0  *******/
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/groupcard" element={<GroupCard />} />
        <Route path="/group/:id" element={<GroupDetails />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/animations" element={<Animations />} />
      </Routes>
    </div>
  );
}

export default App;
