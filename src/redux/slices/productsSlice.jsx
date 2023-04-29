import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  status: "loading", // loading | success | failure
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params) => {
    const {
      categoryQueryParam,
      sortQueryParam,
      searchQueryParam,
      currentPage,
    } = params;
    const apiUrl = `https://6448008250c253374435bb85.mockapi.io/pizzas?page=${currentPage}&limit=8${categoryQueryParam}${sortQueryParam}${searchQueryParam}`;
    const { data } = await axios.get(apiUrl);

    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
        state.products = [];
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failure";
        state.products = [];
      });
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
