const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  // For development, you can use a test email service like Ethereal Email
  // For production, configure with your actual email service (Gmail, SendGrid, etc.)
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || 'ethereal.user@ethereal.email',
      pass: process.env.SMTP_PASS || 'ethereal.pass'
    }
  });
};

// Send verification email
const sendVerificationEmail = async (email, username, verificationToken) => {
  try {
    const transporter = createTransporter();
    
    const verificationUrl = `${process.env.CLIENT_URL || 'http://localhost:3001/TestingForge'}/#/verify-email/${verificationToken}`;
    
    const mailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@aitestforge.com',
      to: email,
      subject: 'AI Test Forge - Email Verification',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; text-align: center;">AI Test Forge</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #495057;">Hello ${username}!</h3>
            <p style="color: #6c757d; line-height: 1.6;">
              Thank you for registering with AI Test Forge. To complete your registration process, 
              please click the link below to verify your email address:
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="background-color: #007bff; color: white; padding: 12px 30px; 
                        text-decoration: none; border-radius: 5px; font-weight: bold;">
                Verify Email
              </a>
            </div>
            <p style="color: #6c757d; font-size: 14px;">
              If you can't click the button, copy and paste the following link into your browser:
            </p>
            <p style="color: #007bff; word-break: break-all; font-size: 14px;">
              ${verificationUrl}
            </p>
            <p style="color: #6c757d; font-size: 14px; margin-top: 30px;">
              This link will expire in 24 hours.<br>
              If you didn't create an account with us, please ignore this email.
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};

// Send password reset email (for future use)
const sendPasswordResetEmail = async (email, username, resetToken) => {
  try {
    const transporter = createTransporter();
    
    const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:3001/TestingForge'}/#/reset-password/${resetToken}`;
    
    const mailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@aitestforge.com',
      to: email,
      subject: 'AI Test Forge - Password Reset',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; text-align: center;">AI Test Forge</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #495057;">Hello ${username}!</h3>
            <p style="color: #6c757d; line-height: 1.6;">
              We received a request to reset your password for your account. 
              Click the link below to create a new password:
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background-color: #dc3545; color: white; padding: 12px 30px; 
                        text-decoration: none; border-radius: 5px; font-weight: bold;">
                Reset Password
              </a>
            </div>
            <p style="color: #6c757d; font-size: 14px;">
              If you can't click the button, copy and paste the following link into your browser:
            </p>
            <p style="color: #dc3545; word-break: break-all; font-size: 14px;">
              ${resetUrl}
            </p>
            <p style="color: #6c757d; font-size: 14px; margin-top: 30px;">
              This link will expire in 1 hour.<br>
              If you didn't request a password reset, please ignore this email.
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail
}; 