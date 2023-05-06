import { RootState } from "../store";
import { ICartItem } from "./types";

export const cartSelector = (state: RootState) => state.cartSlice;

export const cartProductsSelector = (state: RootState) => {
  return state.cartSlice.products;
};

export const cartProductByIdSelector = (id: string) => (state: RootState) =>
  state.cartSlice.products.find((product: ICartItem) => product.id === id);

export const cartProductCountSelector =
  (id: string) =>
  (state: RootState): number =>
    state.cartSlice.products
      .filter((product: ICartItem) => product.id === id)
      .reduce((total, product) => total + product.count, 0);
