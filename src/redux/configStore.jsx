import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducer/cartReducer';
import productReducer from './reducer/productReducer';
import userReducer from './reducer/userReducer';

export const store = configureStore({
  reducer: {
    productReducer,
    userReducer,
    cartReducer,
  },
});
