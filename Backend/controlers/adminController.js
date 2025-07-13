const User = require('../models/user');
const Group = require('../models/Group');

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
    const deletedUser = await User.findByIdAndDelete(userId);

    if (deletedUser) {
      console.log(`✅ Deleted user: ${deletedUser.name} (${deletedUser.email})`);
    } else {
      console.log(`⚠️ No user found with ID: ${userId}`);
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('❌ Delete user error:', err.message);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// Admin updates any user (name, contact, avatar)
exports.updateUserByAdmin = async (req, res) => {
  const { name, contact, avatar } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, contact, avatar },
      { new: true }
    ).select('-password');

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate('creator', 'name email');
    res.json(groups); // or res.json({ groups });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load group data' });
  }

};



