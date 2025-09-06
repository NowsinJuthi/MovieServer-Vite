import userModel from "../models/userModel.js";
import { sendExpiryEmail } from "../utils/mailer.js";

export const notifyExpiredUsers = async (req, res) => {
  try {
    const today = new Date();

    const expiredUsers = await userModel.find({
      expiresAt: { $lt: today },
      notified: { $ne: true }  
    });

    for (const user of expiredUsers) {
      try {
        await sendExpiryEmail(user.email, user.username);
        user.notified = true;
        await user.save();
        console.log(`Email sent ${user.email}`);
      } catch (error) {
        console.error(`Failed to sent Email${user.email}:`, error);
      }
    }

    res.json({ message: "Expired sent to user email", count: expiredUsers.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
