import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { ICartSliceState, ICartItem } from "./types";

const initialState: ICartSliceState = {
  totalPrice: 0,
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<ICartItem>) {
      const findItem = state.products.find(
        (product) => product.id === action.payload.id
      );

      // if product is already in cart then count++ else just add a new product with count 1
      if (findItem) {
        findItem.count++;
      } else {
        state.products.push({ ...action.payload, count: 1 });
      }

      // calc the total price taking into account the added count
      state.totalPrice = calcTotalPrice(state.products);
    },
    incrementCountProduct(state, action: PayloadAction<string>) {
      const findItem = state.products.find(
        (product) => product.id === action.payload
      );

      if (findItem) {
        findItem.count++;
      }

      state.totalPrice = calcTotalPrice(state.products);
    },
    decrementCountProduct(state, action: PayloadAction<string>) {
      const findItem = state.products.find(
        (product) => product.id === action.payload
      );

      if (findItem) {
        findItem.count--;
      }

      state.totalPrice = calcTotalPrice(state.products);
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );

      state.totalPrice = calcTotalPrice(state.products);
    },
    clearProducts(state) {
      state.products = [];
      state.totalPrice = 0;
    },
  },
});


export const {
  addProduct,
  removeProduct,
  clearProducts,
  incrementCountProduct,
  decrementCountProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
