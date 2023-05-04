import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { SortPropertyEnum, TSort, IFilterSliceState } from "../filters/types";

const initialState: IFilterSliceState = {
  category: 0,
  page: 1,
  sort: {
    sortName: "популярности (+)",
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
  search: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<number>) {
      state.category = action.payload;
    },
    setSort(state, action: PayloadAction<TSort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setFilters(state, action: PayloadAction<IFilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.sort = action.payload.sort;
        state.page = action.payload.page;
        state.category = action.payload.category;
        state.search = action.payload.search;
      } else {
        state.sort = {
          sortName: "популярности (+)",
          sortProperty: SortPropertyEnum.RATING_DESC,
        };
        state.page = 1;
        state.category = 0;
        state.search = "";
      }
    },
  },
});

export const { setCategory, setSort, setCurrentPage, setSearch, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
