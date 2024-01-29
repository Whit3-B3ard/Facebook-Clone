import express from "express";
import {
  registerUser,
  signInUser,
  findLoggedUser,
  getAllUsers,
  editUser,
} from "../controllers/userControllers.js";
import auth from "../middleware/userAuth.js";
import upload from "../middleware/middlewareLocalStorage.js";

const router = express.Router();

router.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

router.post("/register", registerUser);

router.post("/login", signInUser);

router.get("/loggeduser", auth, findLoggedUser);

router.get("/fetchusers", getAllUsers);

router.put("/edituser/:userId", upload.single("profilePic"), editUser);

//upload.single("profilePic") ==>> middleware

export default router;
