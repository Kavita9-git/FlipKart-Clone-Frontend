import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { goBack, navigate } from '@navigation/NavigationUtil';
import { useAppSelector } from '@store/reduxHook';
import { selectTotalItemsInCart } from '@modules/cart/api/slice';

const SearchBar = () => {
  const cartLength = useAppSelector(selectTotalItemsInCart);

  return (
    <View style={styles.container}>
      <Pressable onPress={goBack}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
      </Pressable>

      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#000" />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
      </View>

      <Pressable onPress={() => navigate('Cart')}>
        <View style={styles.cartContainer}>
          <MaterialIcons name="shopping-cart" size={24} color="#000" />
          {cartLength > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartLength}</Text>
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    height: 40,
  },
  searchInput: {
    flex: 1,
    color: '#000',
    paddingLeft: 8,
    fontSize: 14,
  },
  cartContainer: {
    position: 'relative',
    paddingHorizontal: 4,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default SearchBar;
