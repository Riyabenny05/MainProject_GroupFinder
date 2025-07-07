// utils/email.js
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // stored in .env

const sendEmail = async ({ to, subject, text }) => {
  const msg = {
    to,
    from: 'iamdayona@gmail.com',
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

module.exports = sendEmail;
