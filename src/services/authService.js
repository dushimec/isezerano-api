import User from "../models/userModel.js";
import { sendSms } from "../helpers/otpHelper.js";
import jwt from "jsonwebtoken";

export const sendOtp = async (phoneNumber) => {
  const otp = generateOtp();
  await User.findOneAndUpdate({ phoneNumber }, { otp }, { upsert: true });
  await sendSms(phoneNumber, otp);
  return otp;
};

export const verifyOtpService = async (phoneNumber, otp) => {
  const user = await User.findOne({ phoneNumber, otp });
  if (user) {
    user.isVerified = true;
    user.otp = null;
    await user.save();

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { isValid: true, token };
  }
  return { isValid: false };
};

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
