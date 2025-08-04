import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@store/reduxHook';
import { toggleWishlist } from '@store/slices/wishlistSlice';
import { useNavigation } from '@react-navigation/native';

type Props = {
  product: { id: string; name: string; price: number; image: string }; // Pass whole product
  showNavigate?: boolean;
};

const WishlistButton: React.FC<Props> = ({ product, showNavigate }) => {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector(state => state.wishlist.items);
  const navigation = useNavigation();

  const isWishlisted = wishlist.some(item => item.id === product?.id);

  const handlePress = () => {
    if (showNavigate) {
      navigation.navigate('Wishlist');
    } else if (product) {
      dispatch(toggleWishlist(product));
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ position: 'absolute', top: 10, left: 10 }}>
      <MaterialIcons
        name={isWishlisted ? 'favorite' : 'favorite-border'}
        size={22}
        color={isWishlisted ? 'red' : 'black'}
      />
    </TouchableOpacity>
  );
};

export default WishlistButton;
