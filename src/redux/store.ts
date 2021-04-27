import { configureStore } from "@reduxjs/toolkit";
import columnsReducer from "./ducks/columns/columnsSlice";
import cardsReducer from "./ducks/cards/cardsSlice";

const store = configureStore({
  reducer: {
    columns: columnsReducer,
    cards: cardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
