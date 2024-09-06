import express from "express";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import attendanceRoutes from "./src/routes/attendanceRoutes.js";
import disciplineRoutes from "./src/routes/disciplineRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import requestRateLimitConfig from "./src/config/rateLimit.js";
import morgan from "morgan";
import { config } from "dotenv";
import cron from "node-cron";
import cors from "cors";
import { dbConnection } from "./src/config/db.js";
dbConnection();

config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.options("*", cors());
app.use(requestRateLimitConfig);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const api = process.env.API_URL;
app.use(`${api}/auth`, authRoutes);
app.use(`${api}/singers`, userRoutes);
app.use(`${api}/attendance`, attendanceRoutes);
app.use(`${api}/discipline`, disciplineRoutes);
app.use(`${api}/admin`, adminRoutes);

cron.schedule("0 0 * * 2,4", async () => {
  console.log("Generating attendance list for today");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
