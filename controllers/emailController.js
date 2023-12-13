const emailModel = require('../models/emailModel');

async function sendWelcomeEmail(to, username) {
  const subject = 'Welcome to Ancestral DNA Collaborator!';
  // eslint-disable-next-line quotes
  const text = `Hello ${username}, welcome to Ancestral DNA Collaborator!`;
  const html =
    // eslint-disable-next-line quotes
    `<h1>Hello ${username}, welcome to Ancestral DNA Collaborator!</h1>`;

  try {
    const messageId = await emailModel.sendEmail(to, subject, text, html);
    console.log('Message sent: %s', messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = { sendWelcomeEmail };