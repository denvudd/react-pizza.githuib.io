import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { ICartSliceState, ICartItem } from "./types";
import isEqual from "lodash.isequal";

const initialState: ICartSliceState = {
  totalPrice: 0,
  products: [],
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<ICartItem>) {
      const idAdded = `${action.payload.id}-${action.payload.size}-${action.payload.type}-${action.payload.title}`; // for products with different params (size/type)
      const foundProductIndex = state.products.findIndex(
        (product) => product.idAdded === idAdded
      );

      // IF product is already in cart AND has similar parameters THEN count++ ELSE just add a new product with count 1
      if (foundProductIndex !== -1) {
        state.products[foundProductIndex].count++;
      } else {
        state.products.push({ ...action.payload, count: 1, idAdded });
      }

      // calc the total price taking into account the added count
      state.totalPrice = calcTotalPrice(state.products);
    },
    incrementCountProduct(state, action: PayloadAction<string>) {
      const findItem = state.products.find(
        (product) => product.idAdded === action.payload
      );

      if (findItem) {
        findItem.count++;
      }

      state.totalPrice = calcTotalPrice(state.products);
    },
    decrementCountProduct(state, action: PayloadAction<string>) {
      const findItem = state.products.find(
        (product) => product.idAdded === action.payload
      );

      if (findItem) {
        findItem.count--;
      }

      state.totalPrice = calcTotalPrice(state.products);
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter((product) => product.idAdded !== action.payload);

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
