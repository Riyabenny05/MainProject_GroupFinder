
const mongoose = require('mongoose');
const groupSchema = new mongoose.Schema({
  title: String,
  subject: String,
  description: String,
  approved: { type: Boolean, default: false },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Group', groupSchema);