
import Razorpay from "razorpay";
import crypto, { verify } from "crypto";
import Order from '../models/order.js';
import Transaction from "../models/transaction.js"
// import items from "razorpay/dist/types/items.js";
// import products from "razorpay/dist/types/products.js";
// import payments from "razorpay/dist/types/payments.js";
import mongoose from 'mongoose';


import axios from 'axios'

const createTransaction = async (req, res) => {
  const { amount, userId } = req.body;


  const razorpay = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_SECRET,
  });

  const options = {
    amount: amount * 100, // paisa 
    currency: "INR",
    receipt: `receipt#${Date.now()}`
  }
  try {

    if (!amount || !userId) {
      return res.status(400).json({
        success: false,
        message: "Amount and user id required"
      })
    }

    const razorpayOrder = await razorpay.orders.create(options)

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      key: process.env.RAZOR_PAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      order_id: razorpayOrder.id,
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};


const createOrder = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    userId,
    cartItems,
    deliveryDate,
    address,
  } = req.body;

  const key_secret = process.env.RAZOR_PAY_SECRET;

  const generated_signature = crypto
    .createHmac("sha256", key_secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    try {
      // ✅ Save Transaction
      const transaction = await Transaction.create({
        user: new mongoose.Types.ObjectId(userId),
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        status: "Success",
        amount: cartItems.reduce(
          (total, item) => total + item?.quantity * item.price,
          0
        ),
      });

      // ✅ Create order instance first
      const newOrder = new Order({
        user: new mongoose.Types.ObjectId(userId),
        address,
        deliveryDate,
        items: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          color: item.color,     // ✅ Add this
          size: item.size,
        })),
        status: "Order Placed",
      });

      // ✅ Save order
      const savedOrder = await newOrder.save();

      // ✅ Link transaction with order
      transaction.order = savedOrder._id;
      await transaction.save();

      console.log("✅ Order saved:", savedOrder); // ✅ DEBUG LOG

      return res.json({
        success: true,
        message: "Payment verified and order created",
        order: savedOrder,
      });
    } catch (error) {
      console.error("❌ Failed to save order:", error.message);
      return res.status(500).json({
        success: false,
        message: "Failed to create transaction or order",
        error: error.message,
      });
    }
  } else {
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }
};




const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ user: userId })
      .populate('items.product')
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: true,
        data: [],
        message: 'No orders found for this user',
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error('❌ Error fetching user orders:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server Error while fetching orders',
      error: error.message,
    });
  }
};




const saveOrder = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      cart,
      userId,
      address,
      amount,
    } = req.body;

    if (!userId || !cart || cart.length === 0) {
      return res.status(400).json({ success: false, message: "User and cart required" });
    }

    const newOrder = new Order({
      user: mongoose.Types.ObjectId(userId), // ✅ FIXED
      address,
      items: cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        color: item.color,     // ✅ Added
        size: item.size,       // ✅ Added
      })),
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      status: "Order Placed",
    });

    await newOrder.save();

    return res.status(201).json({
      success: true,
      message: "Order saved successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Save order error:", error);
    res.status(500).json({
      success: false,
      message: "Order saving failed",
      error: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId)
      .populate("user", "name email")
      .populate("items.product", "name price image_uri")

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

// Add this to controllers/order.js

const verifySignature = async (req, res) => {
  const { razorpay_payment_id } = req.body;

  if (!razorpay_payment_id) {
    return res.status(400).json({ success: false, error: "Payment ID missing" });
  }

  try {
    const key_id = process.env.RAZOR_PAY_KEY_ID;
    const key_secret = process.env.RAZOR_PAY_SECRET;

    const response = await axios.get(
      `https://api.razorpay.com/v1/payments/${razorpay_payment_id}`,
      {
        auth: {
          username: key_id,
          password: key_secret,
        }
      }
    );

    return res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error('Razorpay verify error:', error.response?.data || error.message || error);
    return res.status(400).json({
      success: false,
      error: error.response?.data || "Verification failed",
    });
  }
};




export { createTransaction, createOrder, getOrdersByUserId, saveOrder, getOrderById, verifySignature };
