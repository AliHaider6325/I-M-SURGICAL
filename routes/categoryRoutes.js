import express from "express";
import { createCategory, getCategories } from "../controllers/categoryController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware,createCategory);
router.get("/", getCategories);

export default router;
