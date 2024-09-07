import {
  createSinger,
  modifySinger,
  removeSinger,
  fetchAllSingers,
  fetchSingerProfile,
} from "../services/userService.js";
import { fetchAttendanceForUser } from "../services/attendanceService.js"; // Corrected function name

export const addSinger = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;
    const singer = await createSinger(name, phoneNumber);
    res.status(201).json(singer);
  } catch (error) {
    res.status(500).json({ error: "Failed to add singer" });
  }
};

export const updateSinger = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, phoneNumber } = req.body;
    const updatedSinger = await modifySinger(userId, name, phoneNumber);
    res.status(200).json(updatedSinger);
  } catch (error) {
    res.status(500).json({ error: "Failed to update singer" });
  }
};

export const deleteSinger = async (req, res) => {
  try {
    const { userId } = req.params;
    await removeSinger(userId);
    res.status(204).json({ message: "Singer deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete singer" });
  }
};

export const getAllSingers = async (req, res) => {
  try {
    const singers = await fetchAllSingers();
    res.status(200).json(singers);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve singers" });
  }
};

export const getSingerProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const profile = await fetchSingerProfile(userId);
    const attendance = await fetchAttendanceForUser(userId);
    res.status(200).json({ profile, attendance });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve profile" });
  }
};
