

import React from 'react';
import { Button, Platform, View, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store/store';
import { clearCart } from '../api/slice';
import AsyncStorage from '@react-native-async-storage/async-storage';


const PlaceOrderButton = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.account?.user);

  const cart = useSelector((state: RootState) => state.cart?.items || []);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (Platform.OS !== 'web') {
      Alert.alert('Not Supported', 'Razorpay Web Checkout only works on web via Expo.');
      return;
    }

    if (totalAmount === 0) {
      Alert.alert('Cart Empty', 'Please add items to cart before placing order.');
      return;
    }

    try {
      // Step 1: Create order from backend
      const orderResponse = await fetch('http://localhost:8080/order/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount,
          userId: user?._id, // Replace with actual user ID
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        Alert.alert('Order Creation Failed', orderData.message || 'Try again later');
        return;
      }

      // Step 2: Load Razorpay Checkout script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;

      script.onload = () => {
        const options = {
          key: orderData.key,
          amount: orderData.amount,
          currency: orderData.currency,
          order_id: orderData.order_id,
          name: 'MyApp Store',
          description: 'Order Payment',
          prefill: {
            name: user?.name || 'User',
            email: user?.email || 'test@example.com',
            contact: user?.phone || '',
          },
          theme: {
            color: '#3399cc',
          },
          handler: async (response: any) => {
            // Step 3: Verify payment and save order
            try {
              const verifyResponse = await fetch('http://localhost:8080/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  userId: user?._id, // Replace with actual user ID
                  cartItems: cart,
                  address: user?.address || 'No address provided',       // Replace with real user address
                  deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                }),
              });

              const verifyData = await verifyResponse.json();

              if (verifyData.success) {
                Alert.alert('Success', 'Order placed successfully!');
                console.log('✅ Order created:', verifyData.order);

                // ✅ Clear cart from Redux and AsyncStorage
                dispatch(clearCart());
                await AsyncStorage.removeItem('cart');

                // Optional: Navigate to orders page if needed
                // navigation.navigate('Orders');
              } else {
                Alert.alert('Order Error', verifyData.message || 'Failed to create order');
                console.error('❌ Order creation failed:', verifyData);
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to verify payment and create order.');
              console.error('❌ Verification error:', error);
            }
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      };

      script.onerror = () => {
        Alert.alert('Error', 'Failed to load Razorpay checkout script.');
      };

      if (!document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        document.body.appendChild(script);
      } else {
        script.onload();
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong during the payment process.');
      console.error('❌ Payment error:', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button
        title={`PLACE ORDER ₹${totalAmount}`}
        onPress={handlePlaceOrder}
        color="#007BFF"
        disabled={totalAmount === 0}
      />
    </View>
  );
};

export default PlaceOrderButton;
