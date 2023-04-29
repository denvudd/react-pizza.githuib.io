import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import cartSlice from "./slices/cartSlice";
import productsSlice from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    productsSlice,
  },
});
