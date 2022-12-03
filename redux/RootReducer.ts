import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import detailMovie from "./slices/detailMovie";
import favoriteList from "./slices/favoriteList";
import history from "./slices/history";
import homeSelection from "./slices/homeSelection";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["detailMovie", "homeSelection"],
};

const rootReducer = combineReducers({
  homeSelection,
  detailMovie,
  favoriteList,
  history,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default persistedReducer;
