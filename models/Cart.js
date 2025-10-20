import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, default: 1 },
});

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional if guest cart
  items: [CartItemSchema],
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Cart", CartSchema);
