import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export enum ProductStatus {
  LOADING = "loading",
  SUCCESS = "sucess",
  FAILURE = "failure",
}

export interface IFetchProductsParams {
  category: string;
  sortBy: string;
  order: string;
  search: string;
  page: string;
}

interface IProduct {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  types: number[];
  rating: number;
}

interface IProductSliceState {
  products: IProduct[];
  status: ProductStatus;
}

const initialState: IProductSliceState = {
  products: [],
  status: ProductStatus.LOADING,
};

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

// Selectors
export const productsSelector = (state: RootState) => state.productsSlice;

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
