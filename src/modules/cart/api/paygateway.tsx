import { navigate } from "@navigation/NavigationUtil";
import { BASE_URL } from "@store/config";
import axios from "axios";
import RazorpayCheckout from "react-native-razorpay";
import { Alert, Platform } from "react-native";

// Create Razorpay Transaction
export const createTransaction = async (amount: number, userId: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/order/transaction`, {
      userId,
      amount: amount * 100, // Razorpay uses paise
    });
    return res.data;
  } catch (error) {
    console.error("Transaction Error:", error);
    Alert.alert("Transaction Failed", "Please try again.");
    return null;
  }
};

// Create Razorpay Order & Handle Payment
export const createOrder = async (
  key: string,
  amount: number,
  order_id: string,
  cart: any,
  userId: string,
  address: string
) => {
  try {
    if (Platform.OS === "web") {
      Alert.alert("Error", "Razorpay is not supported on web");
      return { type: "error", message: "Platform not supported" };
    }

    if (!RazorpayCheckout || typeof RazorpayCheckout.open !== "function") {
      Alert.alert("Error", "Razorpay SDK not properly linked.");
      return { type: "error", message: "SDK not available" };
    }

    const options = {
      description: "Ecommerce Shopping",
      image:
        "https://rukminim2.flixcart.com/image/430/516/xif0q/backpack/f/y/5/9-ember-13-ember19sbfmt-laptop-backpack-genie-36-19-original-imagyg9jrmn9huhg.jpeg?q=60&crop=false",
      currency: "INR",
      key,
      amount,
      name: "Kart",
      order_id,
      theme: { color: "#53a20e" },
    };

    RazorpayCheckout.open(options)
      .then(async (data) => {
        const today = new Date();
        const deliveryDate = new Date(today.setDate(today.getDate() + 7));
        // Send order details to backend
        await axios.post(`${BASE_URL}/order`, {
          razorpay_order_id: order_id,
          razorpay_payment_id: data?.razorpay_payment_id,
          razorpay_signature: data?.razorpay_signature,
          userId: userId,
          cartItems: cart,
          deliveryDate,
          address
        });


        // Navigate to success screen
        navigate("paymentSuccess", {
          price: amount / 100,
          address,
        });
      })
      .catch((error: any) => {
        console.log("Payment Error", error);
        Alert.alert("Payment Failed", error?.description || "Try again");
        return { type: "error", message: error?.description };
      });
  } catch (error) {
    console.error("Order Creation Error:", error);
    Alert.alert("Order Error", "Could not process order.");
    return { type: "error", message: "Error" };
  }
};
