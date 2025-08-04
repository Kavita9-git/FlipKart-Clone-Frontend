
import mongoose, { Schema } from "mongoose";

const TransactionSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  orderId: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Success", "Failed"], // ✅ ADD "Success" HERE
    default: "Pending",
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Transaction =
  mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);

export default Transaction;
