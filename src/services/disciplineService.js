import Discipline from "../models/disciplineModel.js";

export const applyDiscipline = async (userId, reason) => {
  const penalty = reason.includes("Off for a month")
    ? "Off for a month"
    : "None";
  const discipline = new Discipline({ userId, reason, penalty });
  return await discipline.save();
};
