import express from "express";
import {
  registerSecretary,
  registerDisciplinarian,
} from "../controllers/adminController.js";
import { adminAuthMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register-secretary", adminAuthMiddleware, registerSecretary);
router.post(
  "/register-disciplinarian",
  adminAuthMiddleware,
  registerDisciplinarian
);

export default router;
