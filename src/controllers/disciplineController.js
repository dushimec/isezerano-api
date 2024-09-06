import { applyDiscipline as applyDisciplineService } from "../services/disciplineService.js";

export const applyDiscipline = async (req, res) => {
  try {
    const { userId, reason } = req.body;
    const discipline = await applyDisciplineService(userId, reason);
    res.status(200).json(discipline);
  } catch (error) {
    res.status(500).json({ error: "Failed to apply discipline" });
  }
};
