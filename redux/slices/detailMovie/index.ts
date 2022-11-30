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
}

const initialState: HomeSectionState = { data: null, loading: false };

const testSlice = createSlice({
  name: "detailMovie",
  initialState,
  reducers: {},
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

export default testSlice.reducer;
