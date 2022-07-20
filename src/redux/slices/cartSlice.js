import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    totalPrice: 0,
    items: [],
  },
  reducers: {
    addItem(state, action) {
      //state.totalPrice += action.payload.price;
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce(
        (sum, obj) => obj.price * obj.count + sum,
        0
      );
    },
    removeItem(state, action) {
      state.items = state.items.filter((a) => a.id !== action.payload);
      state.totalPrice = state.items.reduce(
        (sum, obj) => obj.price * obj.count + sum,
        0
      );
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = state.items.reduce(
        (sum, obj) => obj.price * obj.count + sum,
        0
      );
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem && findItem.count > 1) {
        findItem.count--;
      } else {
        state.items = state.items.filter((a) => a.id !== action.payload);
      }
      state.totalPrice = state.items.reduce(
        (sum, obj) => obj.price * obj.count + sum,
        0
      );
    },
  },
});

export const cartSelector = (state) => state.cart;

export const { setTotalPrice, addItem, removeItem, clearCart, minusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
