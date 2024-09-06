import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String },
  otp: String,
  role: {
    type: String,
    enum: ["Singer", "Secretary", "Disciplinarian", "Admin"],
    required: true,
  },
  isVerified: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);
export default User;
