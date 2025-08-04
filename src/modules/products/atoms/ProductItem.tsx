import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { navigate } from '@navigation/NavigationUtil';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import UniversalAdd from './UniversalAdd';
import { useAppSelector, useAppDispatch } from '@store/reduxHook';
import { Ionicons } from '@expo/vector-icons';
import { addToWishlist, removeFromWishlist } from '@store/slices/wishlistSlice';

const ProductItem = ({ item, isOdd }: any) => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(state => state.wishlist.items);
  const isWishlisted = wishlistItems.some(i => i.id === item._id);

  const toggleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(item._id));
    } else {
      dispatch(addToWishlist({
        id: item._id,
        name: item.name,
        image: item.image_uri,
        price: item.price,
      }));
    }
  };

  const handlePress = () => {
    navigate('ProductDetail', { product: item });
  };

  return (
    <View style={[styles.productCard, { marginRight: isOdd ? 0 : 10 }]}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item?.image_uri }}
            style={styles.productImage}
          />

          {/* Wishlist Icon */}
          <TouchableOpacity
            onPress={toggleWishlist}
            style={{ position: 'absolute', top: 10, left: 10 }}
          >
            <Ionicons
              name={isWishlisted ? 'heart' : 'heart-outline'}
              size={22}
              color={isWishlisted ? 'red' : 'black'}
            />
          </TouchableOpacity>

          {/* AR Button */}
          {item?.ar_uri && (
            <TouchableOpacity
              style={styles.button3d}
              onPress={() => navigate('ARViewer', { uri: item.ar_uri })}
            >
              <MaterialCommunityIcons
                name="cube-scan"
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>

      <View style={{ paddingHorizontal: 10 }}>
        <Text style={styles.productName}>{item?.name}</Text>
        <Text numberOfLines={2} style={styles.productDesc}>
          {item?.description}
        </Text>
        <Text style={styles.productPrice}>
          <Text style={{ textDecorationLine: 'line-through', opacity: 0.6 }}>
            ₹{item?.price + 599}
          </Text>{' '}
          ₹{item?.price}
        </Text>

        <View style={styles.flexRow}>
          <View style={styles.hotDealContainer}>
            <Text style={styles.hotDealText}>Hot Deal</Text>
          </View>
          <UniversalAdd item={item} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: '#fff',
    width: '48%',
    overflow: 'hidden',
    marginBottom: 10,
  },
  imageContainer: {
    backgroundColor: '#F7F7F7',
    width: '100%',
    height: 240,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  button3d: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 50,
    elevation: 5,
    zIndex: 1,
  },
  productName: {
    fontSize: RFValue(10),
    marginTop: 10,
  },
  productDesc: {
    fontSize: RFValue(9),
    color: '#555',
    textAlign: 'left',
    marginTop: 5,
  },
  productPrice: {
    fontSize: RFValue(10),
    color: '#000',
    marginTop: 10,
    fontWeight: '500',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hotDealContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginTop: 10,
    borderRadius: 4,
    alignSelf: 'flex-start',
    backgroundColor: '#E7F9EC',
  },
  hotDealText: {
    color: '#35ABAF',
    fontSize: RFValue(10),
    fontWeight: '700',
  },
});

export default ProductItem;
