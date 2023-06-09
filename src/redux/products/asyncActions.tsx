import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IFetchProductsParams, IProduct } from "./types";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params: IFetchProductsParams, thunkApi) => {
    const { category, search, order, sortBy, page } = params;

    const apiUrl = "https://6448008250c253374435bb85.mockapi.io/pizzas";
    const { data } = await axios.get<IProduct[]>(apiUrl, {
      params: {
        page: page,
        limit: 8,
        category: category,
        sortBy: sortBy,
        order: order,
        search: search,
      },
    });

    return data as IProduct[];

    // if (data.length === 0) {
    //   return thunkApi.rejectWithValue("Empty");
    // }

    // return thunkApi.fulfillWithValue(data);
  }
);
