import express from "express";
import cors from "cors";
import "dotenv/config";
import job from "./lib/cron.js";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

import { connectDB } from "./lib/db.js";

import "dotenv/config";


const app = express();
const PORT = process.env.PORT || 3000;

job.start();
app.use(express.json({ limit: "10mb" }));          // allow bigger JSON payloads
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // for form data

app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});