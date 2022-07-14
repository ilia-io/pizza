import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    totalPrice: 0,
    items: [],
  },
  reducers: {
    // addItem(state, action) {
    //   state.items.push(action.payload);
    //   //state.totalPrice += action.payload.price;
    //   state.totalPrice = state.items.reduce((sum, obj) => obj.price + sum, 0);
    // },
    addItem(state, action) {
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
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { setTotalPrice, addItem, removeItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
