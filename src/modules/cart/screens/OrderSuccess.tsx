

import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import OrderItem from '../atoms/OrderItem';
const OrderSuccess = ({ route }) => {
  const { items } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.successText}>ðŸŽ‰ Order Placed Successfully!</Text>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <OrderItem item={item} showAddButton={false} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  successText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default OrderSuccess;
