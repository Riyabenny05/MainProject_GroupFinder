const Group = require('../models/Group');
const User = require('../models/user');

exports.getAllGroups = async (req, res) => {
  const groups = await Group.find();
  res.json(groups);
};

exports.approveGroup = async (req, res) => {
  const group = await Group.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
  res.json(group);
};

exports.deleteGroup = async (req, res) => {
  await Group.findByIdAndDelete(req.params.id);
  res.json({ message: 'Group deleted' });
};

exports.blockUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User blocked/deleted' });
};
