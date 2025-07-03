const express = require('express');
const router = express.Router();

// ✅ Corrected folder path (controlers not controllers)
const { getAllUsers, approveGroup, deleteUser } = require('../controlers/adminController');

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// ✅ Admin-only protected routes
router.get('/users', authMiddleware, roleMiddleware('admin'), getAllUsers);
router.put('/groups/:id/approve', authMiddleware, roleMiddleware('admin'), approveGroup);
router.delete('/users/:id', authMiddleware, roleMiddleware('admin'), deleteUser);

// routes/adminRoutes.js
router.post("/groups/:id/approve", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  const group = await Group.findById(req.params.id);
  if (!group) return res.status(404).json({ error: "Group not found" });
  group.approved = true;
  group.rejected = false;
  await group.save();
  res.json({ message: "Group approved" });
});

router.post("/groups/:id/reject", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  const group = await Group.findById(req.params.id);
  if (!group) return res.status(404).json({ error: "Group not found" });
  group.approved = false;
  group.rejected = true;
  await group.save();
  res.json({ message: "Group rejected" });
});

module.exports = router;
