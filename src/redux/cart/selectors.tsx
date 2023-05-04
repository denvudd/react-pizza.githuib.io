import { RootState } from "../store";
import { ICartItem } from "./types";

export const cartSelector = (state: RootState) => state.cartSlice;

export const cartProductByIdSelector = (id: string) => (state: RootState) =>
  state.cartSlice.products.find((product: ICartItem) => product.id === id);
