import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

const RazorpayWebView = ({
  amount = 10000, // in paise (₹100 = 10000)
  customer = {
    name: 'Test User',
    email: 'test@example.com',
    contact: '9999999999',
  },
  onPaymentSuccess = (paymentId) => {
    Alert.alert("🎉 Payment Successful", `Payment ID: ${paymentId}`);
  },
  onPaymentError = (err) => {
    Alert.alert("❌ Payment Error", err || "Something went wrong.");
  }
}) => {

  const htmlContent = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body onload="payNow()">
        <script>
          function payNow() {
            var options = {
              "key": "rzp_test_pjgiebKXR675KD", // 🔑 Replace with your key
              "amount": "${amount}",
              "currency": "INR",
              "name": "My Store",
              "description": "Product Purchase",
              "handler": function (response) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  status: "success",
                  payment_id: response.razorpay_payment_id
                }));
              },
              "prefill": {
                "name": "${customer.name}",
                "email": "${customer.email}",
                "contact": "${customer.contact}"
              },
              "theme": {
                "color": "#3399cc"
              }
            };
            var rzp = new Razorpay(options);
            rzp.on('payment.failed', function (response){
              window.ReactNativeWebView.postMessage(JSON.stringify({
                status: "failed",
                error: response.error.description
              }));
            });
            rzp.open();
          }
        </script>
      </body>
    </html>
  `;

  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.status === "success") {
        onPaymentSuccess(data.payment_id);
      } else {
        onPaymentError(data.error || "Unknown error");
      }
    } catch (err) {
      onPaymentError("Parsing failed: " + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: htmlContent }}
        javaScriptEnabled
        onMessage={handleMessage}
        originWhitelist={['*']}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default RazorpayWebView;
