import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params, thunkApi) => {
    const {
      categoryQueryParam,
      sortQueryParam,
      orderQueryParam,
      searchQueryParam,
      currentPage,
    } = params;
    
    const apiUrl = 'https://6448008250c253374435bb85.mockapi.io/pizzas';
    
    const { data } = await axios.get(apiUrl, {
      params: {
        page: currentPage,
        limit: 8,
        category: categoryQueryParam,
        sortBy: sortQueryParam,
        order: orderQueryParam,
        search: searchQueryParam,
      },
    });

    // if (data.length === 0) {
    //   return thunkApi.rejectWithValue("Empty");
    // }

    // return thunkApi.fulfillWithValue(data);

    return data;
  }
);