import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

// only paths — not full URLs
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
