import { createSlice } from "@reduxjs/toolkit";

interface Search {
  query: string;
  isFocused: boolean;
  searchRecent: string[];
}

const initialState: Search = { query: "", isFocused: false, searchRecent: [] };
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    focusInSearchBar: (state) => {
      state.isFocused = true;
    },
    focusOutSearchBar: (state) => {
      state.isFocused = false;
    },
    onChangeTextSearch: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { focusInSearchBar, focusOutSearchBar, onChangeTextSearch } =
  searchSlice.actions;
export default searchSlice.reducer;
