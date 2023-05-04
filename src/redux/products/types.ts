export enum ProductStatus {
  LOADING = "loading",
  SUCCESS = "sucess",
  FAILURE = "failure",
}

export interface IFetchProductsParams {
  category: string | null;
  sortBy: string;
  order: string;
  search: string;
  page: string;
}

export interface IProduct {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  types: number[];
  rating: number;
}

export interface IProductSliceState {
  products: IProduct[];
  status: ProductStatus;
}