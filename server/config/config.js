import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8080;
export const BASE_URL = process.env.BASE_URL || "http://localhost:8080";
export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD || "";
export const RAZOR_PAY_KEY_ID = process.env.RAZOR_PAY_KEY_ID || "";
export const RAZOR_PAY_SECRET = process.env.RAZOR_PAY_SECRET || "";
