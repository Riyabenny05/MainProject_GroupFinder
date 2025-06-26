// db.js
const mongoose = require('mongoose');
require('.env').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err);
  }
};

module.exports = connectDB;
