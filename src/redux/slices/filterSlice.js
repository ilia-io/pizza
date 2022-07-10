import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    categoryId: 0,
    sort: {
      name: 'популярности',
      sortBy: 'rating',
    },
  },
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload
    },
  },
});

export const { setCategoryId, setSort } = filterSlice.actions;

export default filterSlice.reducer;
