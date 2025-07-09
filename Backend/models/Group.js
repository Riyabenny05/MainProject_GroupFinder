

const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  title: String,
  subject: String,
  description: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  approved: { type: Boolean, default: false },
  rejected: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.models.Group || mongoose.model('Group', groupSchema);
module.exports = mongoose.models.Group || mongoose.model('Group', groupSchema);

module.exports = mongoose.models.Group || mongoose.model('Group', groupSchema);

