import Admin from "./auth.model.js";
import generateToken from "../../utils/generateToken.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

/* ================= LOGIN ================= */
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

/* ================= FORGOT PASSWORD ================= */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin)
    return res.status(404).json({ message: "Admin not found" });

  const resetToken = crypto.randomBytes(32).toString("hex");

  admin.resetToken = resetToken;
  admin.resetTokenExpire = Date.now() + 15 * 60 * 1000; // 15 min

  await admin.save();

  const resetUrl = `http://localhost:5173/admin/reset-password/${resetToken}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    to: admin.email,
    subject: "Password Reset — Netson Admin",
    html: `
      <h3>Password Reset Request</h3>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link expires in 15 minutes.</p>
    `,
  });

  res.json({ message: "Reset link sent to email" });
};

/* ================= RESET PASSWORD ================= */
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const admin = await Admin.findOne({
    resetToken: token,
    resetTokenExpire: { $gt: Date.now() },
  });

  if (!admin)
    return res.status(400).json({ message: "Invalid or expired token" });

  admin.password = password;
  admin.resetToken = undefined;
  admin.resetTokenExpire = undefined;

  await admin.save();

  res.json({ message: "Password updated successfully" });
};