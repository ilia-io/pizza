import { createAsyncThunk } from '@reduxjs/toolkit';
import { TPizza } from '../@types/TPizza';
import axios from 'axios';

//type FetchPizzasArgs = Record<string, string>;

const URL = `https://62bdd39cc5ad14c110c766bb.mockapi.io/pizzas`;

type SearchPizzaParams = {
  category: string;
  sortBy: string;
  order: string;
  search: string;
  currentPage: number;
};

export const fetchPizza = createAsyncThunk<TPizza[], SearchPizzaParams>(
  'pizza/fetchPizza',
  async (params) => {
    const { category, sortBy, order, search, currentPage } = params;
    const { data } = await axios.get<TPizza[]>(
      `${URL}?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
    );
    return data;
  }
);
