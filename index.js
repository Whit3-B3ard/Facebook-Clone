import { dbName, port, uri } from "./lib/env-vars.js";
import express from "express";
import connectDB from "./lib/mongodb.js";
import "dotenv/config";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/uploads", express.static("uploads"));

app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

  connectDB();
});