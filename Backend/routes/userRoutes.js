const express = require('express');
const router = express.Router();

const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// ✅ GET user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // exclude password
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// ✅ UPDATE user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    //newedit(no avatar)
    const { name, contact, avatar } = req.body;
    console.log('🧾 Update received:', { name, contact, avatar });
const updatedUser = await User.findByIdAndUpdate(
  req.user.id,
  { name, contact, avatar },
  { new: true }
).select('-password');
//newedit
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;