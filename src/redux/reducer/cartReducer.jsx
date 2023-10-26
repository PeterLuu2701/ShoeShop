import { createSlice } from '@reduxjs/toolkit';
import { http } from '../../utils/config';

const initialState = {
  cartProducts: [],
  cartAmount: 0,
  cartTotalPrice: 0,
};

const deleteProduct = (state, productID) => {
  if (
    window.confirm(`Do you want to remove the product with ID ${productID}?`)
  ) {
    state.cartProducts = state.cartProducts.filter((p) => p.id !== productID);
  }
};

const cartReducer = createSlice({
  name: 'cartReducer',
  initialState,
  reducers: {
    addToCartAction: (state, action) => {
      const product = action.payload;
      const productFound = state.cartProducts.find((p) => p.id === product.id);

      if (productFound) {
        productFound.amount += product.amount;
      } else {
        state.cartProducts.push(product);
      }
    },
    changeProductQuantityAction: (state, action) => {
      const { id, num } = action.payload;
      const productFound = state.cartProducts.find((p) => p.id === id);

      if (productFound) {
        if (productFound.amount === 1 && num === -1) {
          deleteProduct(state, productFound.id);
          return;
        }

        productFound.amount += num;
      }
    },
    deleteProductAction: (state, action) => {
      deleteProduct(state, action.payload);
    },
    clearCartAction: (state) => {
      state.cartProducts = [];
    },
    calculateTotalsAction: (state) => {
      let amount = 0;
      let totalPrice = 0;

      state.cartProducts.forEach((product) => {
        amount += product.amount;
        totalPrice += product.amount * product.price;
      });

      state.cartAmount = amount;
      state.cartTotalPrice = totalPrice;
    },
  },
});

export const {
  addToCartAction,
  changeProductQuantityAction,
  deleteProductAction,
  clearCartAction,
  calculateTotalsAction,
} = cartReducer.actions;

export default cartReducer.reducer;

export const submitOrderApi = (order) => {
  return async () => {
    try {
      await http.post(`/api/Users/order`, order);
    } catch (error) {
      console.log(error);
    }
  };
};
