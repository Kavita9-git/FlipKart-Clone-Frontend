
import express from "express";

import { createTransaction, createOrder, getOrdersByUserId, getOrderById,  saveOrder, verifySignature  } from "../controllers/order.js";



const router = express.Router();

router.post("/transaction", createTransaction);
router.post("/", createOrder);
router.get("/user/:userId", getOrdersByUserId);
router.get("/:orderId", getOrderById); 
router.post("/verify", verifySignature);
router.post("/save", saveOrder);


         


export default router
