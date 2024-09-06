import express from "express";
import { applyDiscipline } from "../controllers/disciplineController.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/apply", roleMiddleware(["Disciplinarian"]), applyDiscipline);

export default router;
