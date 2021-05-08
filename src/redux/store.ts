import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore } from "redux-persist";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { userReducer } from "./ducks/user";
import { columnsReducer } from "./ducks/columns";
import { cardsReducer } from "./ducks/cards";
import { commentsReducer } from "./ducks/comments";

const userPersistConfig = {
  key: "user",
  storage,
};

const columnsPersistConfig = {
  key: "columns",
  storage: storage,
};

const cardsPersistConfig = {
  key: "cards",
  storage: storage,
};

const commentsPersistConfig = {
  key: "comments",
  storage: storage,
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  columns: persistReducer(columnsPersistConfig, columnsReducer),
  cards: persistReducer(cardsPersistConfig, cardsReducer),
  comments: persistReducer(commentsPersistConfig, commentsReducer),
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [],
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
