const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/email');

router.post('/send', async (req, res) => {
  const { to, message } = req.body;

  try {
    await sendEmail({
      to,
      subject: 'Notification from Admin',
      text: message,
    });

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

module.exports = router;
