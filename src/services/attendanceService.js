import Attendance from "../models/attendanceModel.js";
import { applyDiscipline } from "./disciplineService.js";

export const recordAttendance = async (userId, status) => {
  const attendance = new Attendance({ userId, date: new Date(), status });
  await attendance.save();
  await evaluateDiscipline(userId);
  return attendance;
};

export const fetchAttendanceForUser = async (userId) => {
  return await Attendance.find({ userId });
};

export const evaluateDiscipline = async (userId) => {
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  const absences = await Attendance.find({
    userId,
    status: "Absent",
    date: { $gte: twoWeeksAgo },
  });

  if (absences.length >= 2) {
    await applyDiscipline(userId, "Missed 2 times in a week");
    if (absences.length >= 4) {
      await applyDiscipline(userId, "Off for a month");
    }
  }
};
