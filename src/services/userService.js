import User from "../models/userModel.js";

export const createSinger = async (name, phoneNumber) => {
  const singer = new User({ name, phoneNumber, role: "Singer" });
  return await singer.save();
};

export const modifySinger = async (userId, name, phoneNumber) => {
  return await User.findByIdAndUpdate(
    userId,
    { name, phoneNumber },
    { new: true }
  );
};

export const removeSinger = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

export const fetchAllSingers = async () => {
  return await User.find({ role: "Singer" });
};

export const fetchSingerProfile = async (userId) => {
  return await User.findById(userId);
};
