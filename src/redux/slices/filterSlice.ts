import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Sort = {
  name: string;
  sortBy: 'rating' | 'title' | 'price';
};

interface FilterSliceState {
  categoryId: number;
  sort: Sort;
  currentPage: number;
  searchValue: string;
  orderSort: boolean;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortBy: 'rating',
  },
  currentPage: 1,
  searchValue: '',
  orderSort: false,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setOrderSort(state, action: PayloadAction<boolean>) {
      state.orderSort = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setOrderSort,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
