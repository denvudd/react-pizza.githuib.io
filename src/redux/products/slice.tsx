import { createSlice } from "@reduxjs/toolkit";
import { IProductSliceState, ProductStatus } from "./types";
import { fetchProducts } from "./asyncActions";

const initialState: IProductSliceState = {
  products: [],
  status: ProductStatus.LOADING,
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
        state.status = ProductStatus.LOADING;
        state.products = [];
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = ProductStatus.SUCCESS;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = ProductStatus.FAILURE;
        state.products = [];
      });
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
