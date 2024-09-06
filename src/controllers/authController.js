import { sendOtp, verifyOtpService } from "../services/authService.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";

export const registerAdmin = async (req, res) => {
  try {
    const { phoneNumber, name, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = new User({
      phoneNumber,
      name,
      role: "Admin",
      password: hashedPassword,
      isVerified: true,
    });
    await user.save();
    res.status(201).json({ message: "Admin registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Failed to register admin" });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await User.findOne({ phoneNumber });
    if (user && (await comparePassword(password, user.password))) {
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to log in" });
  }
};

export const requestOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const otp = await sendOtp(phoneNumber);
    res.status(200).json({ message: "OTP sent", otp });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    const { isValid, token } = await verifyOtpService(phoneNumber, otp);
    
    if (isValid) {
      res.status(200).json({ message: "OTP verified", token });
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to verify OTP" });
  }
};

