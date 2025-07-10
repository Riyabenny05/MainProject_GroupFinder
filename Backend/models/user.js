const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  contact: String,
  password: String,
  role: { type: String, default: 'user' },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],

  //newedit-->
  avatar: {
    type: String,
    default: '/avatars/default1.png',
  },
  //<--newedit
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);



