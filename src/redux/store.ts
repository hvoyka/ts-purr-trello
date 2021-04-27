import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import userReducer from "./ducks/user/userSlice";
import columnsReducer from "./ducks/columns/columnsSlice";
import cardsReducer from "./ducks/cards/cardsSlice";

const columnsPersistConfig = {
  key: "columns",
  storage: storage,
};

const cardsPersistConfig = {
  key: "cards",
  storage: storage,
};

const userPersistConfig = {
  key: "user",
  storage,
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  columns: persistReducer(columnsPersistConfig, columnsReducer),
  cards: persistReducer(cardsPersistConfig, cardsReducer),
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
