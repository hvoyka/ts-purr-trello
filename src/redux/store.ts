import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./ducks/user/userSlice";
import columnsReducer from "./ducks/columns/columnsSlice";
import cardsReducer from "./ducks/cards/cardsSlice";

const store = configureStore({
  reducer: {
    columns: columnsReducer,
    cards: cardsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
