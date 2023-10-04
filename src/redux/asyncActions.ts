import { createAsyncThunk } from '@reduxjs/toolkit';
import { TPizza } from '../@types/TPizza';
import axios from 'axios';

//type FetchPizzasArgs = Record<string, string>;

const URL = `https://62bdd39cc5ad14c110c766bb.mockapi.io/pizzas`;

export type SearchPizzaParams = {
  category: string;
  sortBy: string;
  order: string;
  search?: string;
  currentPage?: number;
  itemsPerPage?: number;
  searchString: string;
};

export const fetchPizza = createAsyncThunk<TPizza[], SearchPizzaParams>(
  'pizza/fetchPizza',
  async (params) => {
    const {
      category,
      sortBy,
      order,
      search,
      currentPage,
      itemsPerPage,
      searchString,
    } = params;
    const response = await axios.get<TPizza[]>(
      `${URL}?&${category}&sortBy=${sortBy}&order=${order}`
    );
    const searchSorted = response.data.filter((pizza) =>
      pizza.title.toLowerCase().includes(searchString.toLowerCase())
    );
    return searchSorted;
  }
);
