const Group = require('../models/Group');
const User = require('../models/user');

exports.createGroup = async (req, res) => {
  const { title, subject, description } = req.body;
  try {
    const group = await Group.create({ title, subject, description, creator: req.user.id });
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGroups = async (req, res) => {
  const groups = await Group.find({ approved: true });
  res.json(groups);
};

exports.joinGroup = async (req, res) => {
  const group = await Group.findById(req.params.id);
  if (!group.members.includes(req.user.id)) {
    group.members.push(req.user.id);
    await group.save();
  }
  res.json(group);
};

exports.leaveGroup = async (req, res) => {
  const group = await Group.findById(req.params.id);
  group.members = group.members.filter(m => m.toString() !== req.user.id);
  await group.save();
  res.json({ message: 'Left group' });
};
