const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  }
});

async function sendEmail(to, subject, text, html) {
  const info = await transporter.sendMail({
    from: '"ANC DNA COLLAB" <Robert.Wright@ancestraldnacollaborator.com>',
    to,
    subject,
    text,
    html,
  });

  return info.messageId;
}

module.exports = { sendEmail };