const User = require('../models/user');
const Group = require('../models/group');

// ✅ Get all users (for admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password
    res.json(users);
  } catch (err) {
    console.error('Get users error:', err.message);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// ✅ Approve a group
exports.approveGroup = async (req, res) => {
  try {
    const groupId = req.params.id;
    const group = await Group.findByIdAndUpdate(groupId, { approved: true }, { new: true });

    if (!group) return res.status(404).json({ error: 'Group not found' });

    res.json({ message: 'Group approved successfully', group });
  } catch (err) {
    console.error('Approve group error:', err.message);
    res.status(500).json({ error: 'Failed to approve group' });
  }
};

// ✅ Delete user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete user error:', err.message);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
