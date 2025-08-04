import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomSafeAreaView from '@components/atom/CustomSafeAreaView';
import { RFValue } from 'react-native-responsive-fontsize';
import { useAppSelector } from '@store/reduxHook';
import { selectCartItems } from './api/slice';
import { navigate, goBack } from '@navigation/NavigationUtil';
import { Colors } from '@utils/Constants';
import OrderItem from './atoms/OrderItem';
import PlaceOrderButton from './atoms/PlaceOrderButton';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const Cart = () => {
  const carts = useAppSelector(selectCartItems);
  const user = useAppSelector((state) => state.account.user) as any;

  const route = useRoute();
  const { item, selectedColor, selectedSize, isBuyNow } = route.params || {};

  const buyNowItem = isBuyNow
    ? {
        ...item,
        selectedColor,
        selectedSize,
        quantity: 1,
      }
    : null;

  const renderItem = ({ item }: any) => <OrderItem item={item} />;

  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        {/* Heading */}
        <Text style={styles.heading}>My Cart</Text>
        <Text style={styles.number}>Deliver to: {user?.phone ? user?.phone : '🗺'}</Text>
        <Text style={styles.address}>{user?.address ? user?.address : 'No address available'}</Text>
      </View>

      {isBuyNow ? (
        <FlatList
          data={[buyNowItem]}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : carts.length > 0 ? (
        <FlatList
          data={carts}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity style={styles.shopNowButton} onPress={() => navigate('Categories')}>
            <Text style={styles.shopNowText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      )}

      {(isBuyNow || carts.length > 0) && <PlaceOrderButton />}
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 12,
    paddingBottom: 20,
    borderBottomWidth: 5,
    borderColor: '#F0F2F5',
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 8,
    width: 30,
  },
  heading: {
    fontSize: RFValue(14),
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  number: {
    fontWeight: '500',
  },
  address: {
    color: '#666',
    marginTop: 3,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: RFValue(14),
    color: '#666',
    marginBottom: 16,
  },
  shopNowButton: {
    backgroundColor: Colors.active,
    padding: 10,
  },
  shopNowText: {
    fontSize: RFValue(12),
    color: '#fff',
    fontWeight: '500',
  },
  listContainer: {
    paddingTop: 8,
    paddingBottom: 100,
  },
});

export default Cart;
