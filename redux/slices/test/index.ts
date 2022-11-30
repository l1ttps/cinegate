import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getData from "../../../api/services/getData";

export const fetchData = createAsyncThunk("test/fetchData", async () => {
  const res = await getData();
  return res.data;
});

interface TestState {
  name: string;
  loading: boolean;
}

const initialState: TestState = { name: "", loading: false };

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
      })
      .addCase(fetchData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default testSlice.reducer;
