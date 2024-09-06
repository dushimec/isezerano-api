import express from "express";
import {
  addSinger,
  updateSinger,
  deleteSinger,
  getAllSingers,
  getSingerProfile,
} from "../controllers/userController.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/add-singer", roleMiddleware(["Secretary"]), addSinger);
router.put("/singers/:userId", roleMiddleware(["Secretary"]), updateSinger);
router.delete("/singers/:userId", roleMiddleware(["Secretary"]), deleteSinger);
router.get("/singers", roleMiddleware(["Secretary"]), getAllSingers);
router.get("/profile/:userId", roleMiddleware(["Singer"]), getSingerProfile);

export default router;
