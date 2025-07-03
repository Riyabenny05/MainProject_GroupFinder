const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    description: { type: String },
    
approved: {
  type: Boolean,
  default: false
},
rejected: {
  type: Boolean,
  default: false
},

    approved: { type: Boolean, default: false },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
  
);

//  Prevent OverwriteModelError
module.exports = mongoose.models.Group || mongoose.model('Group', groupSchema);
