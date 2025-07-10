const Message = require('../models/Message');

// ✅ Create message
exports.createMessage = async (req, res) => {
  try {
    const senderModel = req.user.isAdmin ? 'Admin' : 'User';
    const message = await Message.create({
      groupId: req.body.groupId,
      content: req.body.content,
      type: req.body.type || 'text',
      senderId: req.user.id,
      senderModel
    });

    res.status(201).json(message);
  } catch (err) {
    console.error('Message send error:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

// ✅ Get messages of a group
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ groupId: req.params.groupId })
      .populate('senderId', 'name')
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};
