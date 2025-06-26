const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    default: 'General'
  },
  description: {
    type: String
  },
  members: {
    type: [String],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);
