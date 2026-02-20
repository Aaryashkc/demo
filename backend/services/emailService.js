/**
 * Email service for sending OTP codes
 * In production, integrate with services like SendGrid, AWS SES, or Nodemailer
 */

/**
 * Send OTP code to user's email
 * @param {string} email - User's email address
 * @param {string} otpCode - 6-digit OTP code
 * @returns {Promise<boolean>} - Success status
 */
export const sendOTPEmail = async (email, otpCode) => {
  try {
    // TODO: Integrate with actual email service (SendGrid, AWS SES, Nodemailer, etc.)
    // For now, log to console (development mode)
    console.log(`[EMAIL SERVICE] Sending OTP to ${email}: ${otpCode}`);
    console.log(`[EMAIL SERVICE] Email subject: Your OTP Code`);
    console.log(`[EMAIL SERVICE] Email body: Your OTP code is ${otpCode}. It will expire in 10 minutes.`);
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // In production, uncomment and configure:
    /*
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: 'Your OTP Code',
      html: `
        <h2>Your OTP Code</h2>
        <p>Your OTP code is: <strong>${otpCode}</strong></p>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
      `
    });
    */
    
    return true;
  } catch (error) {
    console.error('[EMAIL SERVICE] Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};

/**
 * Send OTP code to user's phone (SMS)
 * @param {string} phone - User's phone number
 * @param {string} otpCode - 6-digit OTP code
 * @returns {Promise<boolean>} - Success status
 */
export const sendOTPSMS = async (phone, otpCode) => {
  try {
    // TODO: Integrate with SMS service (Twilio, AWS SNS, etc.)
    console.log(`[SMS SERVICE] Sending OTP to ${phone}: ${otpCode}`);
    
    // Simulate SMS sending delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return true;
  } catch (error) {
    console.error('[SMS SERVICE] Error sending OTP SMS:', error);
    throw new Error('Failed to send OTP SMS');
  }
};

