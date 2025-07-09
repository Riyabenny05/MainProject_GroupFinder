// routes/groupRoutes.js
const express = require('express');
const router = express.Router();
const groupController = require('../controlers/groupController');
const authMiddleware = require('../middleware/authMiddleware');

const {
  createGroup,
  getAllGroups,
  joinGroup,
  leaveGroup,
  deleteGroup,
  getGroupById, 
} = require('../controlers/groupController'); 
// Apply middleware here 👇
router.post('/', authMiddleware, groupController.createGroup);

// Other routes..
router.get('/', groupController.getGroups);
router.post('/:id/join', authMiddleware, groupController.joinGroup);
router.post('/:id/leave', authMiddleware, groupController.leaveGroup);
router.get('/:id', getGroupById);
router.delete('/:id', authMiddleware, groupController.deleteGroup);


module.exports = router;
module.exports = router;

