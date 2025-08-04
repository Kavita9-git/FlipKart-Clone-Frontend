// src/modules/wishlist/api/slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  items: string[]; // array of product IDs
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<string>) {
      const productId = action.payload;
      if (state.items.includes(productId)) {
        state.items = state.items.filter(id => id !== productId);
      } else {
        state.items.push(productId);
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;

export const selectWishlist = (state: any) => state.wishlist.items;

export default wishlistSlice.reducer;
