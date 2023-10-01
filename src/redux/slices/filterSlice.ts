import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortPropEnum } from '../../@types/SortPropEnum';
import { TSort } from '../../@types/TSort';

export interface FilterSliceState {
  categoryId: string;
  sort: TSort;
  currentPage: number;
  searchValue: string;
  orderSort: boolean;
}

const initialState: FilterSliceState = {
  categoryId: '0',
  sort: {
    name: 'популярности',
    sortBy: SortPropEnum.RATING,
  },
  currentPage: 1,
  searchValue: '',
  orderSort: false,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<string>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<TSort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setOrderSort(state, action: PayloadAction<boolean>) {
      state.orderSort = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = action.payload.currentPage;
        state.categoryId = action.payload.categoryId;
        state.sort = action.payload.sort;
      } else {
        state.currentPage = 1;
        state.categoryId = '0';
        state.sort = {
          name: 'популярности',
          sortBy: SortPropEnum.RATING,
        };
      }
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
