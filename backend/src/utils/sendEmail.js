import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // ✅ fixed: was EMAIL_PASSWORD
  },
});

export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    console.log('✉️ Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Email error:', error);
    throw error;
  }
};

export const sendPasswordResetEmail = (email, resetToken, baseURL) => {
  const resetLink = `${baseURL}/reset-password/${resetToken}`;
  return sendEmail(email, '🔐 Password Reset - Lumière', `
    <div style="font-family:sans-serif;max-width:480px;margin:auto">
      <h2 style="color:#1a1a18">Password Reset Request</h2>
      <p>You requested a password reset. Click the button below:</p>
      <a href="${resetLink}" style="display:inline-block;background:#7b8f72;color:#fff;padding:12px 24px;border-radius:4px;text-decoration:none;margin:16px 0">Reset Password</a>
      <p style="color:#888;font-size:0.85rem">This link expires in 1 hour. If you didn't request this, ignore this email.</p>
    </div>
  `);
};

export const sendWelcomeEmail = (email, name) => {
  return sendEmail(email, '✨ Welcome to Lumière', `
    <div style="font-family:sans-serif;max-width:480px;margin:auto">
      <h2 style="color:#1a1a18">Welcome to Lumière, ${name}! 🌿</h2>
      <p>Thank you for joining our botanical beauty community.</p>
      <p>Your account is ready. Start exploring our exclusive collection.</p>
    </div>
  `);
};

export const sendOrderConfirmationEmail = (email, orderNumber, totalPrice) => {
  return sendEmail(email, '📦 Order Confirmed - Lumière', `
    <div style="font-family:sans-serif;max-width:480px;margin:auto">
      <h2 style="color:#1a1a18">Order Confirmed!</h2>
      <p>Thank you for your purchase.</p>
      <p><strong>Order:</strong> #${String(orderNumber).slice(-8).toUpperCase()}</p>
      <p><strong>Total:</strong> $${Number(totalPrice).toFixed(2)}</p>
      <p style="color:#888;font-size:0.85rem">You'll receive tracking info once your order ships.</p>
    </div>
  `);
};