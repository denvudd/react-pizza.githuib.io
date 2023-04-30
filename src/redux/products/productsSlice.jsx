import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./asyncActions";

const initialState = {
  products: [],
  status: "loading", // loading | success | failure
};

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
