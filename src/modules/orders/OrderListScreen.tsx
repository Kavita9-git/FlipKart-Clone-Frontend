

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';

// ✅ Replace this with your local IP when testing on physical device
const BASE_URL = "http://192.168.29.201:8080"; // Make sure your backend runs on this IP

const OrderListScreen = () => {
  const userId = useSelector((state: any) => state.auth.user?._id);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/order/user/${userId}`);
        console.log("Fetched Orders:", res.data);
        setOrders(res.data.data || []);
      } catch (err: any) {
        console.error('❌ Error fetching orders:', err.message);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.title}>Order Status: {item.status}</Text>
      <Text>Delivery Address: {item.address}</Text>
      <Text>Date: {new Date(item.deliveryDate).toLocaleDateString()}</Text>
      <Text style={styles.subtitle}>Items:</Text>

      {item.items.map((itm: any, index: number) => {
        const product = itm.product;

        if (!product || typeof product === 'string') {
          return (
            <Text key={index} style={styles.warning}>
              • Product info missing (ID: {itm.product})
            </Text>
          );
        }

        return (
          <View key={index} style={styles.productItem}>
            <Image source={{ uri: product.image_uri }} style={styles.productImage} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.productText}>
                {itm.quantity}x {product.name}
              </Text>
              <Text style={styles.productPrice}>₹{product.price}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 30 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Orders</Text>
      {orders.length === 0 ? (
        <Text style={styles.empty}>No orders available</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item: any) => item._id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  empty: { textAlign: 'center', marginTop: 40, color: 'gray' },
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 12,
  },
  title: { fontWeight: 'bold', marginBottom: 4 },
  subtitle: { marginTop: 6, fontWeight: '600' },
  productItem: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  productImage: { width: 50, height: 50, borderRadius: 6 },
  productText: { fontSize: 16 },
  productPrice: { fontSize: 14, color: '#444' },
  warning: { color: 'red', fontSize: 13 },
});

export default OrderListScreen;
