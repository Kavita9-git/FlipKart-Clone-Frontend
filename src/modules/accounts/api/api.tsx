

import { BASE_URL } from "@store/config"
import axios from "axios"


export const loginOrSignUp = async (phone: string, address: string) => {
    try {
        const res = await axios.post(`${BASE_URL}/user/login`, {
            phone,
            address
        })
        return res.data.user
    } catch (error) {
        console.log("Login or Signup error", error)
        return null
    }
}


export const getOrderByUserId = async (userId: string) => {
  try {
    const res = await axios.get(`http://192.168.29.201:8080/order/user/${userId}`);
    console.log("ðŸ“¦ Raw API response:", res.data);
    return res.data.orders; // âœ… already array
  } catch (error: any) {
    console.log("Order error for user ID:", userId);
    if (error.response) {
      console.log("âŒ Server responded with:", error.response.status, error.response.data);
    } else if (error.request) {
      console.log("âŒ No response received. Request was:", error.request);
    } else {
      console.log("âŒ Error setting up request:", error.message);
    }
    return [];
  }
};


  export const API = axios.create({
  baseURL: "http://192.168.29.201:8080/api/orders" // âœ… Correct
 // Replace with your backend
});






