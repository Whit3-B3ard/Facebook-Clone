import express from "express";
import {
  registerUser,
  signInUser,
  findLoggedUser,
  getAllUsers,
} from "../controllers/userControllers.js";

const router = express.Router();

router.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

router.post("/register", registerUser);

router.post("/signin", signInUser);

router.get("/loggeduser", findLoggedUser);

router.get("/fetchusers", getAllUsers);

export default router;
