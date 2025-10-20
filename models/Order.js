import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  // ✅ Customer details (since user auth removed)
  customerName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
  },

  // ✅ Delivery method (e.g. Cash on Delivery / Express)
  deliveryMethod: {
    type: String,
    required: true,
  },

  // ✅ Ordered items
  items: [
    {
      productName: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }, // helpful for calculations
    },
  ],

  // ✅ Total order amount
  totalAmount: {
    type: Number,
    required: true,
  },

  // ✅ Optional status and timestamps
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  orderStatus: {
    type: String,
    enum: ["processing", "shipped", "delivered", "cancelled"],
    default: "processing",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
