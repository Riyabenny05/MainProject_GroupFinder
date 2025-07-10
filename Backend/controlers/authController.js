const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// ✅ Debug: Hash admin password and log it (use only once to get hash)
bcrypt.hash('adminpass', 10).then(hash => {
  console.log('🔑 Hashed adminpass:', hash);
});

// ✅ Helper: Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// ✅ Register new user
exports.register = async (req, res) => {
  const { name, email, contact, password } = req.body;

  try {
    console.log('📥 Register request:', req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('⚠️ Email already registered:', email);
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashed = await bcrypt.hash(password, 10);
    console.log('🔑 Hashed password for new user:', hashed);

    const user = await User.create({
      name,
      email,
      contact,
      password: hashed,
      role: 'user',
    });

    const token = generateToken(user);
    console.log('✅ Registered user:', user.email);

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error('❌ Register error:', err.message);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

// ✅ Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('🔐 Login request:', email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('🔎 Comparing password...');
    console.log('User-entered password:', password);
    console.log('Hashed password in DB:', user.password);

    const match = await bcrypt.compare(password, user.password);
    console.log('🔁 Password match result:', match);

    if (!match) {
      console.log('❌ Invalid password for:', email);
      return res.status(401).json({ error: 'Invalid password' });
    }

const token = generateToken(user);

console.log('✅ Login success for:', email);

res.json({
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    contact: user.contact,
    avatar: user.avatar || '',
  },
  token,
});
  } catch (err) {
    console.error('❌ Login error:', err.message);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};
