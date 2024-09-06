import express from "express";
import {
  loginAdmin,
  registerAdmin,
  requestOtp,
  verifyOtp,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/home", (req,res) =>{
    res.send("welcome")
})


router.post("/request", requestOtp);
router.post("/verify", verifyOtp);
router.post("/register-admin", registerAdmin);
router.post("/login-admin", loginAdmin);

export default router;
