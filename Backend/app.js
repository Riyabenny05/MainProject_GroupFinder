const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./db'); // ✅ This will automatically run the connect function

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes will go here

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
