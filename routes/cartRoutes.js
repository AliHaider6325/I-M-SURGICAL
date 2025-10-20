import express from "express";
import mongoose from "mongoose";
import Cart from "../models/Cart.js";

const router = express.Router();

// Helper: validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Get or create single cart (no userId)
const getCart = async () => {
  let cart = await Cart.findOne().populate("items.productId");
  if (!cart) cart = new Cart({ items: [] });
  return cart;
};

// 1. Add product to cart
router.post("/add", async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!isValidObjectId(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    const cart = await getCart();

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Get cart
router.get("/", async (req, res) => {
  try {
    const cart = await getCart();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. Update quantity
router.put("/update", async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!isValidObjectId(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    const cart = await getCart();

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. Remove item
router.delete("/remove", async (req, res) => {
  try {
    const { productId } = req.body;

    if (!isValidObjectId(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    const cart = await getCart();
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
