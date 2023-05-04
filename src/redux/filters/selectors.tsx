import { RootState } from "../store";

export const sortSelector = (state: RootState) => state.filterSlice.sort;
export const filterSelector = (state: RootState) => state.filterSlice;