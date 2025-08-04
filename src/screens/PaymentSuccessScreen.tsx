import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const PaymentSuccessScreen = ({ route }) => {
  const { price, address } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
        }}
        style={styles.image}
      />
      <Text style={styles.title}>Payment Successful 🎉</Text>
      <Text style={styles.details}>Amount Paid: ₹{price}</Text>
      <Text style={styles.details}>Delivery Address: {address}</Text>
    </View>
  );
};

export default PaymentSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0ffe0",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: "center",
  },
});
