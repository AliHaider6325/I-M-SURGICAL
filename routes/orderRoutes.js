import express from "express";
import { createOrder, getOrders,deleteOrder } from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/", createOrder);
router.get("/",authMiddleware, getOrders);
router.delete("/:id",authMiddleware, deleteOrder);


export default router;
