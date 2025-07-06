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
      subject: 'AI Test Forge - Weryfikacja adresu email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; text-align: center;">AI Test Forge</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #495057;">Cześć ${username}!</h3>
            <p style="color: #6c757d; line-height: 1.6;">
              Dziękujemy za rejestrację w AI Test Forge. Aby dokończyć proces rejestracji, 
              kliknij poniższy link, aby zweryfikować swój adres email:
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="background-color: #007bff; color: white; padding: 12px 30px; 
                        text-decoration: none; border-radius: 5px; font-weight: bold;">
                Weryfikuj Email
              </a>
            </div>
            <p style="color: #6c757d; font-size: 14px;">
              Jeśli nie możesz kliknąć przycisku, skopiuj i wklej poniższy link do przeglądarki:
            </p>
            <p style="color: #007bff; word-break: break-all; font-size: 14px;">
              ${verificationUrl}
            </p>
            <p style="color: #6c757d; font-size: 14px; margin-top: 30px;">
              Ten link wygaśnie za 24 godziny.<br>
              Jeśli to nie Ty rejestrowałeś się w naszym serwisie, zignoruj ten email.
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
      subject: 'AI Test Forge - Reset hasła',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; text-align: center;">AI Test Forge</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #495057;">Cześć ${username}!</h3>
            <p style="color: #6c757d; line-height: 1.6;">
              Otrzymaliśmy prośbę o reset hasła dla Twojego konta. 
              Kliknij poniższy link, aby utworzyć nowe hasło:
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background-color: #dc3545; color: white; padding: 12px 30px; 
                        text-decoration: none; border-radius: 5px; font-weight: bold;">
                Resetuj Hasło
              </a>
            </div>
            <p style="color: #6c757d; font-size: 14px;">
              Jeśli nie możesz kliknąć przycisku, skopiuj i wklej poniższy link do przeglądarki:
            </p>
            <p style="color: #dc3545; word-break: break-all; font-size: 14px;">
              ${resetUrl}
            </p>
            <p style="color: #6c757d; font-size: 14px; margin-top: 30px;">
              Ten link wygaśnie za 1 godzinę.<br>
              Jeśli to nie Ty prosiłeś o reset hasła, zignoruj ten email.
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