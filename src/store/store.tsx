import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'; // ✅ FIXED
import { persistReducer, persistStore } from 'redux-persist';
import reduxStorage from './storage';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

// ✅ Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// ✅ Redux persist config
const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['wishlist', 'cart', 'account'], // only persist these reducers
};

// ✅ Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
      thunk: false, // disable thunk since we use saga
    }).concat(sagaMiddleware),
});

// ✅ Run saga middleware
sagaMiddleware.run(rootSaga);

// ✅ Persistor
export const persistor = persistStore(store);

// ✅ Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
