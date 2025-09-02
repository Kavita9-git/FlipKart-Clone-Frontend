import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8081;
export const BASE_URL = process.env.BASE_URL || "http://192.168.29.201:8081";
export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD || "";
export const RAZOR_PAY_KEY_ID = process.env.RAZOR_PAY_KEY_ID || "";
export const RAZOR_PAY_SECRET = process.env.RAZOR_PAY_SECRET || "";
