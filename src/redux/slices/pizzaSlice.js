import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = `https://62bdd39cc5ad14c110c766bb.mockapi.io/pizzas`;

export const fetchPizza = createAsyncThunk(
  'pizza/fetchPizza',
  async (params) => {
    const { category, sortBy, order, search, currentPage } = params;
    const { data } = await axios.get(
      `${url}?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
    );
    return data;
  }
);

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: {
    items: [],
    status: 'loading', //loading | success | error
  },
  reducers: {
    setPizzas(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizza.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizza.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizza.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
