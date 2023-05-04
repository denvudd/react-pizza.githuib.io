export enum SortPropertyEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
}

export type TSort = {
  sortName: string;
  sortProperty: SortPropertyEnum;
};

export interface IFilterSliceState {
  category: number;
  page: number;
  sort: TSort;
  search: string;
}
