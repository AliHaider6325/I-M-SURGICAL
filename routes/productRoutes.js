import express from "express";
import { createProduct, getProducts } from "../controllers/productController.js";
import upload from "../middleware/upload.js"

const router = express.Router();

router.post("/", upload.array("images", 5), createProduct);
router.get("/", getProducts);

export default router;
