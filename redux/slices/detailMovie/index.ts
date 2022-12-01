import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getDetailMovie from "../../../api/services/getDetailMovie";
import { Movie } from "../../../shared/types";

export const fetchDetailMovie = createAsyncThunk(
  "fetchDetailMovie",
  async ({ id, category }: { id: number; category: number }) => {
    const res = await getDetailMovie(id, category);
    return res;
  }
);

interface HomeSectionState {
  data: Movie | null;
  loading: boolean;
  isOpen: boolean;
}

const initialState: HomeSectionState = {
  data: null,
  loading: false,
  isOpen: false,
};

const detailMovieSlice = createSlice({
  name: "detailMovie",
  initialState,
  reducers: {
    openPopupDetailMovie: (state) => {
      state.isOpen = true;
    },
    closePopupDetailMovie: (state) => {
      state.isOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDetailMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDetailMovie.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { openPopupDetailMovie, closePopupDetailMovie } =
  detailMovieSlice.actions;

export default detailMovieSlice.reducer;
