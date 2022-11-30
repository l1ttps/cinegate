import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import test from "./slices/test";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  // blacklist: ["collections", "test"],
};

const rootReducer = combineReducers({
  test,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default persistedReducer;
