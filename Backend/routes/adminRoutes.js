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

module.exports = router;
