const Group = require('../models/Group');
const User = require('../models/user');



// ✅ Create a new group
exports.createGroup = async (req, res) => {
  try {
    const { title, subject, description } = req.body;

    if (!title || !subject || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newGroup = new Group({
      title,
      subject,
      description,
      creator: req.user.id,
      members: [req.user.id],
      approved: false, // pending approval
      rejected: false
    });

    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (err) {
    res.status(500).json({ error: 'Server error while creating group' });
  }
};


// ✅ Get all approved groups
exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.find({ approved: true }).populate('creator', 'name email');
    res.json(groups);
  } catch (err) {
    console.error("❌ Failed to fetch groups:", err);
    res.status(500).json({ error: 'Failed to fetch groups' });
  }
};
exports.getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate('creator', 'name _id')
      .populate('members', 'name _id');
    if (!group) return res.status(404).json({ error: "Group not found" });
    res.json(group);
  } catch (err) {
    console.error("Fetch single group failed:", err);
    res.status(500).json({ error: "Failed to fetch group" });
  }
};



// ✅ Join a group
exports.joinGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found' });

    if (!group.members.includes(req.user.id)) {
      group.members.push(req.user.id);
      await group.save();
    }

    res.json(group);
  } catch (err) {
    console.error("❌ Failed to join group:", err);
    res.status(500).json({ error: 'Failed to join group' });
  }
};

// ✅ Leave a group
exports.leaveGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found' });

    group.members = group.members.filter(m => m.toString() !== req.user.id);
    await group.save();

    res.json({ message: 'Left group successfully' });
  } catch (err) {
    console.error("❌ Failed to leave group:", err);
    res.status(500).json({ error: 'Failed to leave group' });
  }
};
// ✅ Delete a group
exports.deleteGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found' });

    console.log("🧠 Creator from DB:", group.creator.toString());
    console.log("🧠 Authenticated user ID:", req.user.id);

    // ✅ Correct comparison using .equals()
    if (!group.creator.equals(req.user.id)) {
      return res.status(403).json({ error: 'Only the creator can delete this group' });
    }

    await group.deleteOne();
    res.json({ message: 'Group deleted successfully' });
  } catch (err) {
    console.error("❌ Failed to delete group:", err);
    res.status(500).json({ error: 'Failed to delete group' });
  }
};