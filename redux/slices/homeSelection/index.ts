import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getHomeSelection from "../../../api/services/getHomeSelection";
import { HomeSection } from "../../../shared/types";

export const fetchHomeSelection = createAsyncThunk(
  "home/fetchHomeSelection",
  async () => {
    return await getHomeSelection();
  }
);

interface HomeSectionState {
  data: HomeSection[];
  loading: boolean;
}

const initialState: HomeSectionState = { data: [], loading: false };

const homeSelectionSlice = createSlice({
  name: "homeSelection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeSelection.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHomeSelection.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHomeSelection.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default homeSelectionSlice.reducer;
