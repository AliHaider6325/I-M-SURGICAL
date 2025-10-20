import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// 1. Add product to cart
router.post("/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId });
  if (!cart) cart = new Cart({ userId, items: [] });

  const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  res.json(cart);
});

// 2. Get cart
router.get("/:userId", async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId");
  res.json(cart);
});

// 3. Update quantity
router.put("/update", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const cart = await Cart.findOne({ userId });
  const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity = quantity;
  }
  await cart.save();
  res.json(cart);
});

// 4. Remove item
router.delete("/remove", async (req, res) => {
  const { userId, productId } = req.body;
  const cart = await Cart.findOne({ userId });
  cart.items = cart.items.filter(item => item.productId.toString() !== productId);
  await cart.save();
  res.json(cart);
});

export default router;
