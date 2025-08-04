import { combineReducers } from 'redux';
import homeReducer from '@modules/home/api/slice';
import categoriesReducer from '@modules/categories/api/slice';
import cartReducer from '@modules/cart/api/slice';
import accountReducer from '../modules/accounts/api/slice';
import wishlistReducer from '../features/wishlist/wishlistSlice';

const rootReducer = combineReducers({
  home: homeReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  account: accountReducer,
  wishlist: wishlistReducer,
});

export default rootReducer;
