const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/authMiddleware');

// Get all messages in a group
router.get('/:groupId', auth, async (req, res) => {
  const { groupId } = req.params;
  try {
    const messages = await Message.find({
      groupId,
      deletedForEveryone: false,
      deletedFor: { $ne: req.user.id },
    }).populate('senderId', 'name email');
    res.json(messages);
  } catch (err) {
    console.error('❌ Error fetching messages:', err);
    res.status(500).json({ error: err.message });
  }
});

// Send a message
router.post('/', auth, async (req, res) => {
  const { groupId, content, type } = req.body;
  if (!groupId || !content) {
    return res.status(400).json({ error: 'Group ID and content are required' });
  }

  try {
    const msg = await Message.create({
      groupId,
      senderId: req.user.id,
      content,
      type: type || 'text',
    });
    res.status(201).json(msg);
  } catch (err) {
    console.error('❌ Error sending message:', err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete message for me
router.patch('/:id/delete-for-me', auth, async (req, res) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ error: 'Message not found' });

    if (!msg.deletedFor.includes(req.user.id)) {
      msg.deletedFor.push(req.user.id);
      await msg.save();
    }

    res.json({ message: '✅ Deleted for you' });
  } catch (err) {
    console.error('❌ Error deleting for me:', err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete message for everyone
router.patch('/:id/delete-for-everyone', auth, async (req, res) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ error: 'Message not found' });

    msg.deletedForEveryone = true;
    await msg.save();
    res.json({ message: '✅ Deleted for everyone' });
  } catch (err) {
    console.error('❌ Error deleting for everyone:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
