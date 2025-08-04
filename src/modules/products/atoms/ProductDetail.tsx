
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import UniversalAdd from './UniversalAdd';
import SearchBar from './SearchBar';
import { addItem } from '@modules/cart/api/slice';


const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch(); // ✅ Redux dispatch

  const product = route?.params?.product || {};
  const item = {
    _id: product?._id || product?.id || 'fallback-id',
    ...product,
  };

  const {
    name = 'Product Name',
    price = 0,
    description = 'No description available.',
    image_uri,
    images = image_uri ? [image_uri] : [],
    discount = 73,
    originalPrice = price + 590,
    rating = 4.1,
    reviews = 739,
    ratings = 14876,
    color = [],
    size = [],
  } = item;

  const [selectedColor, setSelectedColor] = useState(color[0]);
  const [selectedSize, setSelectedSize] = useState(size[0]);

  const handleBuyNow = () => {
    dispatch(
      addItem({
        _id: product._id,
        name: product.name,
        price: product.price,
        image_uri: product.image_uri,
        color: selectedColor, // ✅ selected value
        size: selectedSize,   // ✅ selected value
        description: product.description,
        quantity: 1,
        totalPrice: product.price,
      })
    );

    navigation.navigate('Cart'); // ✅ Make sure this matches your route name
  };

  return (
    <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
      <SearchBar />

      <FlatList
        horizontal
        data={images}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.price}>
          ₹{price}{' '}
          <Text style={styles.strike}>₹{originalPrice}</Text>{' '}
          <Text style={styles.discount}>{discount}% off</Text>
        </Text>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>
            ⭐ {rating} ({ratings} ratings & {reviews} reviews)
          </Text>
        </View>

        {color.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Color</Text>
            <View style={styles.colorRow}>
              {color.map((c, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorCircle,
                    { backgroundColor: c.toLowerCase() },
                    selectedColor === c && styles.selectedBorder,
                  ]}
                  onPress={() => setSelectedColor(c)}
                />
              ))}
            </View>
          </>
        )}

        {size.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.sizeRow}>
              {size.map((s, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.sizeBox, selectedSize === s && styles.selectedSize]}
                  onPress={() => setSelectedSize(s)}
                >
                  <Text style={styles.sizeText}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{description}</Text>

        <View style={styles.cartButtonWrapper}>
          <UniversalAdd item={{ ...item, selectedColor, selectedSize }} />
        </View>

        <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
          <Text style={styles.buyText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff' },
  image: { width, height: 450 },
  detailsContainer: { padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginVertical: 8 },
  price: { fontSize: 16, color: '#388e3c', marginBottom: 8 },
  strike: { textDecorationLine: 'line-through', color: '#888' },
  discount: { color: '#d32f2f', fontWeight: 'bold' },
  ratingContainer: { marginVertical: 4 },
  ratingText: { color: '#555' },
  sectionTitle: { fontWeight: 'bold', fontSize: 16, marginTop: 16 },
  colorRow: { flexDirection: 'row', marginVertical: 8 },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedBorder: { borderWidth: 2, borderColor: '#000' },
  sizeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginVertical: 8 },
  sizeBox: {
    borderWidth: 1,
    borderColor: '#aaa',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 8,
  },
  selectedSize: { borderColor: '#000', backgroundColor: '#e0e0e0' },
  sizeText: { fontWeight: '500' },
  description: { color: '#333', marginTop: 8, lineHeight: 20 },
  buyButton: {
    backgroundColor: '#F44336',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  buyText: { color: '#fff', fontWeight: 'bold' },
  cartButtonWrapper: { marginTop: 16 },
});
