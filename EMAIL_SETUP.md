# Email Verification Setup Guide

## Overview
This guide explains how to configure email verification for the AI Test Forge platform.

## Required Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/qa-learning-platform

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=30d

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@aitestforge.com

# Client URL (for email verification links)
CLIENT_URL=http://localhost:3000

# Server
PORT=5000
```

## Email Provider Setup

### Gmail Configuration
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → App passwords
   - Generate a new app password
   - Use this password in `SMTP_PASS`

### Other Email Providers
You can also use:
- **SendGrid**: Set `SMTP_HOST=smtp.sendgrid.net`, `SMTP_PORT=587`
- **Mailgun**: Set `SMTP_HOST=smtp.mailgun.org`, `SMTP_PORT=587`
- **AWS SES**: Set `SMTP_HOST=email-smtp.region.amazonaws.com`, `SMTP_PORT=587`

## Development Testing

For development, you can use Ethereal Email (fake SMTP):
```env
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=ethereal.user@ethereal.email
SMTP_PASS=ethereal.pass
```

## How It Works

1. **User Registration**: User provides username, email, and password
2. **Account Creation**: User account is created with `isEmailVerified: false`
3. **Email Sent**: Verification email is sent to user's email address
4. **Email Verification**: User clicks link in email to verify their account
5. **Login Enabled**: User can now log in with verified email

## Security Features

- ✅ **Verification Required**: Users cannot log in until email is verified
- ✅ **Token Expiration**: Verification links expire after 24 hours
- ✅ **Unique Tokens**: Each verification uses a unique UUID token
- ✅ **Resend Functionality**: Users can request new verification emails
- ✅ **Secure Storage**: Verification tokens are stored securely in database

## Testing the System

1. Start the backend server: `cd backend && npm run dev`
2. Start the frontend: `cd frontend && npm start`
3. Register a new account
4. Check email for verification link
5. Click the verification link
6. Try logging in with the verified account

## Troubleshooting

### Email Not Sending
- Check SMTP credentials in `.env`
- Verify email provider settings
- Check server console for error messages
- Ensure firewall allows outbound SMTP traffic

### Verification Link Not Working
- Check if `CLIENT_URL` is set correctly
- Verify the token hasn't expired (24 hours)
- Check browser console for errors
- Try generating a new verification email

### Gmail Authentication Issues
- Ensure 2FA is enabled
- Use App Password, not regular password
- Check "Less secure app access" if using older authentication

## Production Considerations

1. **Use Real Email Provider**: Don't use Ethereal Email in production
2. **Secure Environment Variables**: Store in secure environment variable service
3. **Domain Configuration**: Set up proper domain for email sending
4. **Rate Limiting**: Implement rate limiting for email sending
5. **Email Templates**: Consider using professional email templates
6. **Monitoring**: Monitor email delivery rates and bounces 