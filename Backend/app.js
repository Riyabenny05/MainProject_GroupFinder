const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const groupRoutes = require('./routes/groupRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const materialRoutes = require('./routes/MaterialRoutes');
const messageRoutes = require('./routes/messageRoutes');

const notificationRoutes = require('./routes/notifications'); 



const app = express();
const PORT = 5000;


//  Allow requests from frontend (Vite - 5173)

// ✅ Allow requests from frontend (Vite - 5173)

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/messages', messageRoutes);
app.use('/api/materials', require('./routes/MaterialRoutes'));
app.use('/api/materials', materialRoutes);
  app.use('/api/auth', require('./routes/authRoutes'));



// ✅ Register routes with correct base paths
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);


app.use('/api/notifications', require('./routes/notifications'));




// ✅ Connect to MongoDB once
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection failed:', err));
