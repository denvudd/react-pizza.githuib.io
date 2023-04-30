import { createSlice } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

const initialState = {
  totalPrice: 0,
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      const findItem = state.products.find(
        (product) => product.id === action.payload.id
      );

      // if product is already in cart then count++ else just add a new product
      if (findItem) {
        findItem.count++;
      } else {
        state.products.push({ ...action.payload, count: 1 });
      }

      // calc the total price taking into account the added count
      state.totalPrice = calcTotalPrice(state.products);
    },
    incrementCountProduct(state, action) {
      const findItem = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (findItem) {
        findItem.count++;
      }

      state.totalPrice = calcTotalPrice(state.products);
    },
    decrementCountProduct(state, action) {
      const findItem = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (findItem) {
        findItem.count--;
      }

      state.totalPrice = calcTotalPrice(state.products);
    },
    removeProduct(state, action) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );

      state.totalPrice = calcTotalPrice(state.products);
    },
    clearProducts(state, action) {
      state.products = [];
      state.totalPrice = 0;
    },
  },
});

// Selectors
export const cartSelector = (state) => state.cartSlice;
export const cartProductByIdSelector = (id) => (state) =>
  state.cartSlice.products.find((product) => product.id === id);

export const {
  addProduct,
  removeProduct,
  clearProducts,
  incrementCountProduct,
  decrementCountProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
