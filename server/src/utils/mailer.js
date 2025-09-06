import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
transporter.verify((error, success) => {
    if (error) {
        console.log("SMTP connection error:", error);
    } else {
        console.log("SMTP server connected successfully");
    }
})


export const sendOTPtoEmail = async (email, otp) => {
const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject:"OTP verification",
    html:`<p>${otp}</p>`

}
try {
    await transporter.sendMail(mailOptions);
    return true
} catch (error) {
    const err = new Error ('Failed to sent email')
    error.statusCode = 400;
    throw error
}

}
export const sendExpiryEmail = async (email, username) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Your account has expired",
    html: `<p>Hi ${username}, your account has expired. Please renew or contact support.</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    const err = new Error('Failed to send expiry email');
    err.statusCode = 400;
    throw err;
  }
};
import cron from 'node-cron';
import { notifyExpiredUsers } from '../controllers/notifyExpiredUsers.js';

cron.schedule('0 0 * * *', () => {
  notifyExpiredUsers();
});
