import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Favorite } from "../../../shared/types";
import { RootState } from "../../RootReducer";

const favoriteListAdapter = createEntityAdapter<Favorite>({
  selectId: (favorite) => favorite.id,
  sortComparer: (a, b) => a.createdAt - b.createdAt,
});

const favoriteListSlice = createSlice({
  name: "favoriteList",
  initialState: favoriteListAdapter.getInitialState(),
  reducers: {
    addFavorite: favoriteListAdapter.addOne,
    removeFavorite: favoriteListAdapter.removeOne,
  },
});

const favoriteListSelector = favoriteListAdapter.getSelectors<RootState>(
  (state) => state.favoriteList
);

export const { addFavorite, removeFavorite } = favoriteListSlice.actions;
export default favoriteListSlice.reducer;
