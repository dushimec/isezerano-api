import express from "express";
import {
  markAttendance,
  getAttendance,
  checkDiscipline,
} from "../controllers/attendanceController.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/mark", roleMiddleware(["Disciplinarian"]), markAttendance);
router.get("/user/:userId", roleMiddleware(["Disciplinarian"]), getAttendance);
router.get(
  "/discipline/:userId",
  roleMiddleware(["Disciplinarian"]),
  checkDiscipline
);

export default router;
