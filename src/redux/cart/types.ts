export interface ICartItem {
  id: string;
  idAdded?: string;
  title: string;
  imageUrl: string;
  price: number;
  type: string;
  size: number;
  count: number;
}
export interface ICartSliceState {
  totalPrice: number;
  products: ICartItem[];
}
export interface ICartItemProps {
  product: ICartItem;
}