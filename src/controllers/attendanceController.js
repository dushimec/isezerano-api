import {
  recordAttendance,
  fetchAttendanceForUser,
  evaluateDiscipline,
} from "../services/attendanceService.js";

export const markAttendance = async (req, res) => {
  try {
    const { userId, status } = req.body;
    const attendance = await recordAttendance(userId, status);
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: "Failed to mark attendance" });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const { userId } = req.params;
    const attendance = await fetchAttendanceForUser(userId);
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: "Failed to get attendance" });
  }
};

export const checkDiscipline = async (req, res) => {
  try {
    const { userId } = req.params;
    const disciplineStatus = await evaluateDiscipline(userId);
    res.status(200).json(disciplineStatus);
  } catch (error) {
    res.status(500).json({ error: "Failed to check discipline" });
  }
};
