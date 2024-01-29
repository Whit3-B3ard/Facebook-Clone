import { dbName, port, uri } from "./lib/env-vars.js";
import express from "express";
import connectDB from "./lib/mongodb.js";
import "dotenv/config";

const app = express();

app.use(express.json())


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

  connectDB();
});
