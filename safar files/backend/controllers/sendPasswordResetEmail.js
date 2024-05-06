// sendPasswordResetEmail.js

const nodemailer = require('nodemailer');

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your_email@gmail.com', // Your Gmail email address
    pass: 'your_password' // Your Gmail password or app-specific password
  }
});

// Function to send password reset email
function sendPasswordResetEmail(email, resetToken) {
  // Email content
  const mailOptions = {
    from: 'your_email@gmail.com', // Sender email address
    to: email, // Recipient email address
    subject: 'Password Reset', // Email subject
    text: `To reset your password, please click on the following link: http://yourwebsite.com/reset-password?token=${resetToken}` // Email body
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending password reset email:', error);
    } else {
      console.log('Password reset email sent:', info.response);
    }
  });
}

module.exports = sendPasswordResetEmail;
