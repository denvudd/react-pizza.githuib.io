import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    sortName: "популярности (+)",
    sortProperty: "rating",
  },
  searchQuery: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSearch(state, action) {
      state.searchQuery = action.payload;
    },
    setFilters(state, action) {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

// Selectors
export const sortSelector = (state) => state.filterSlice.sort;
export const filterSelector = (state) => state.filterSlice;

export const { setCategory, setSort, setCurrentPage, setSearch, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
