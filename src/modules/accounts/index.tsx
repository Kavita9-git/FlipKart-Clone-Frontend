// unchanged imports
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAppSelector } from '@store/reduxHook';
import CustomSafeAreaView from '@components/atom/CustomSafeAreaView';
import LoginModal from './molecules/LoginModal';
import { formatDate } from '@utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const BASE_URL = 'http://localhost:8080';

const Account = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const scrollRef = useRef<ScrollView>(null);
  const ordersRef = useRef<View>(null);
  const user = useAppSelector(state => state.account.user);
  const [isVisible, setIsVisible] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    if (!user?._id) return;
    try {
      const res = await fetch(`${BASE_URL}/order/user/${user._id}`);
      const data = await res.json();
      if (Array.isArray(data.data)) setOrders(data.data);
      else setOrders([]);
    } catch (error) {
      console.error('Fetch orders error:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user?._id]);

  useEffect(() => {
    if (route?.params?.isRefresh && user) fetchOrders();
  }, [route, user]);

  const scrollToOrders = () => {
    ordersRef.current?.measureLayout(
      scrollRef.current?.getInnerViewNode(),
      (x, y) => scrollRef.current?.scrollTo({ y, animated: true }),
      error => console.log('measureLayout error', error)
    );
  };

  const renderItem = ({ item }: any) => {
    const product = item?.product;
    if (!product || typeof product === 'string') {
      return (
        <View style={styles.orderItem}>
          <Text style={styles.itemText}>Product details not available</Text>
        </View>
      );
    }
    return (
      <View style={styles.orderItem}>
        <Image source={{ uri: product.image_uri }} style={styles.image} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.itemText}>{`${item.quantity}x ${product.name}`}</Text>
          <Text style={styles.itemPrice}>₹{product.price}</Text>
        </View>
      </View>
    );
  };

  const gridItems = [
    {
      label: 'Orders',
      icon: 'cube-outline',
      color: '#3F51B5',
      onPress: scrollToOrders,
    },
    {
      label: 'Wishlist',
      icon: 'heart-outline',
      color: '#E91E63',
      onPress: () => navigation.navigate('Wishlist'),
    },
    {
      label: 'Coupons',
      icon: 'gift-outline',
      color: '#FF9800',
      onPress: () => alert('Coupons tapped'),
    },
    {
      label: 'Help Center',
      icon: 'headset-outline',
      color: '#4CAF50',
      onPress: () => alert('Help Center tapped'),
    },
  ];

  const recentStores = [
    {
      id: '1',
      title: "Women's Ethnic",
      image: 'https://via.placeholder.com/100x120.png?text=Store+1',
    },
    {
      id: '2',
      title: 'Electronics',
      image: 'https://via.placeholder.com/100x120.png?text=Store+2',
    },
    {
      id: '3',
      title: 'Beauty',
      image: 'https://via.placeholder.com/100x120.png?text=Store+3',
    },
  ];


  const recentlyViewed = [
  {
    name: 'Women’s Ethnic',
    image: 'https://example.com/images/women-ethnic.jpg',
  },
  {
    name: 'Electronics',
    image: 'https://example.com/images/electronics.jpg',
  },
  {
    name: 'Beauty',
    image: 'https://example.com/images/beauty.jpg',
  },
];


  return (
    <>
      <CustomSafeAreaView>
        <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{user ? user.phone : 'Account'}</Text>
            <Text style={styles.sub}>{user ? user.address : 'No address available'}</Text>
            <TouchableOpacity style={styles.loginBtn} onPress={() => setIsVisible(true)}>
              <Text style={styles.loginText}>{user ? 'Update' : 'Login'}</Text>
            </TouchableOpacity>
          </View>

          {/* Grid Menu */}
          <View style={styles.gridContainer}>
            {gridItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.gridItem} onPress={item.onPress}>
                <Icon name={item.icon} size={26} color={item.color} />
                <Text style={styles.gridText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

         
          {/* Recently Viewed Stores Section */}
{/* <View style={{ marginTop: 24 }}>
  <Text style={styles.sectionTitle}>Recently Viewed Stores</Text>
  <FlatList
    horizontal
    data={recentlyViewed}
    keyExtractor={(item) => item.name}
    renderItem={({ item }) => (
      <View style={styles.storeCard}>
        <Image source={{ uri: item.image }} style={styles.storeImage} />
        <Text style={styles.storeName}>{item.name}</Text>
      </View>
    )}
    showsHorizontalScrollIndicator={false}
  />
</View> */}


          {/* Orders */}
          <View style={styles.orderSection} ref={ordersRef}>
            <Text style={styles.sectionTitle}>Your Orders</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#2196F3" style={{ marginTop: 20 }} />
            ) : orders.length > 0 ? (
              orders.map(order => (
                <View key={order._id} style={styles.orderBox}>
                  <FlatList
                    data={order.items}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    scrollEnabled={false}
                  />
                  <Text style={styles.addressText}>{order.address}</Text>
                  <Text style={styles.deliveryDate}>
                    Delivery by: {formatDate(order?.deliveryDate)}
                  </Text>
                  <Text style={styles.status}>{order?.status}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>
                {!user ? 'Login to place orders' : 'No orders available'}
              </Text>
            )}
          </View>

          {/* My Activity */}
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>My Activity</Text>
            <Feather name="chevron-right" size={20} />
          </View>

          {/* Feedback / Account Settings */}
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Feedback</Text>
            <Feather name="chevron-right" size={20} />
          </View>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Account Settings</Text>
            <Feather name="chevron-right" size={20} />
          </View>
        </ScrollView>
      </CustomSafeAreaView>

      <LoginModal onClose={() => setIsVisible(false)} visible={isVisible} />
    </>
  );
};

export default Account;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 40,
  },
  header: {
    padding: 16,
    backgroundColor: '#E3F2FD',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A237E',
  },
  sub: {
    fontSize: 14,
    color: '#37474F',
    marginVertical: 4,
  },
  loginBtn: {
    backgroundColor: '#2196F3',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  loginText: {
    color: '#fff',
    fontWeight: '600',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  gridItem: {
    width: '40%',
    aspectRatio: 1,
    backgroundColor: '#ffffff',
    marginVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  gridText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginTop: 24,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  orderSection: {
    padding: 16,
  },
  orderBox: {
    backgroundColor: '#FAFAFA',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 13,
    color: '#555',
  },
  addressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
  },
  deliveryDate: {
    fontSize: 12,
    color: '#009688',
    marginTop: 4,
  },
  status: {
    fontWeight: '600',
    color: '#4CAF50',
    marginTop: 4,
  },
  emptyText: {
    marginTop: 30,
    textAlign: 'center',
    color: '#aaa',
  },
  storeBox: {
    width: 100,
    marginRight: 12,
    alignItems: 'center',
  },
  storeImage: {
    width: 100,
    height: 120,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  storeTitle: {
    fontSize: 12,
    marginTop: 6,
    color: '#333',
    textAlign: 'center',
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },


  storeCard: {
  width: 100,
  alignItems: 'center',
  marginRight: 12,
},
storeImage: {
  width: 80,
  height: 80,
  borderRadius: 8,
  backgroundColor: '#eee',
},
storeName: {
  fontSize: 12,
  marginTop: 4,
  textAlign: 'center',
},

});
