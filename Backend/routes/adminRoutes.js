const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const { getAllGroups, approveGroup, deleteGroup, blockUser } = require('../controlers/adminController');

router.use(auth, role('admin'));
router.get('/groups', getAllGroups);
router.put('/groups/:id/approve', approveGroup);
router.delete('/groups/:id', deleteGroup);
router.delete('/users/:id', blockUser);

module.exports = router;
