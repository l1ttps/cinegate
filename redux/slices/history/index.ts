import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { History } from "../../../shared/types";

const historyAdapter = createEntityAdapter<History>({
  selectId: (history) => history.id,
  sortComparer: (a, b) => a.createdAt - b.createdAt,
});

const historySlice = createSlice({
  name: "history",
  initialState: historyAdapter.getInitialState(),
  reducers: {
    addHistory: historyAdapter.addOne,
    updateHistory: historyAdapter.updateOne,
    removeHistory: historyAdapter.removeOne,
  },
});

export const { addHistory, removeHistory, updateHistory } =
  historySlice.actions;
export default historySlice.reducer;
