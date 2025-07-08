// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const User = require('../models/User');

const {
  getAllUsers,
  deleteUser,
  getAllGroups, // ✅ New controller
} = require('../controlers/adminController');

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// ✅ Admin-only protected routes
router.get('/users', authMiddleware, roleMiddleware('admin'), getAllUsers);
router.delete('/users/:id', authMiddleware, roleMiddleware('admin'), deleteUser);

// ✅ ✅ ✅ Admin Dashboard: Fetch all groups (for /api/admin/groups)
router.get('/groups', authMiddleware, roleMiddleware('admin'), getAllGroups);


// ✅ Approve a group
router.patch('/groups/:id/approve', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found' });

    group.approved = true;
    group.rejected = false;
    await group.save();

    res.json({ message: '✅ Group approved' });
  } catch (err) {
    console.error('❌ Approve error:', err);
    res.status(500).json({ error: 'Server error while approving group' });
  }
});

// ✅ Reject a group
router.patch('/groups/:id/reject', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found' });

    group.approved = false;
    group.rejected = true;
    await group.save();

    res.json({ message: '❌ Group rejected' });
  } catch (err) {
    console.error('❌ Reject error:', err);
    res.status(500).json({ error: 'Server error while rejecting group' });
  }
});


module.exports = router;

module.exports = router;

