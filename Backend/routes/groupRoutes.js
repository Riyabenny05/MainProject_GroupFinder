const express = require('express');
const router = express.Router();
 
const auth = require('../middleware/authMiddleware');
const { createGroup, getGroups, joinGroup, leaveGroup } = require('../controlers/groupController');

router.get('/', getGroups);
router.post('/', auth, createGroup);
router.post('/:id/join', auth, joinGroup);
router.post('/:id/leave', auth, leaveGroup);

module.exports = router;
