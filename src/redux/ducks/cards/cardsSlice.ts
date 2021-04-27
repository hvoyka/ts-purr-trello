import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { initCardsData } from "../../../utils/init-default-data";

export type ColumnCards = Record<string, ColumnCard>;

export interface ColumnCard {
  id: string;
  columnId: string;
  title: string;
  text: string;
  author: string;
}

const initialState: ColumnCards = initCardsData();

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    onCardAdd: {
      reducer(state, action: PayloadAction<ColumnCard>) {
        state[action.payload.id] = action.payload;
      },
      prepare(columnId, title, author) {
        return {
          payload: {
            id: nanoid(),
            columnId,
            title,
            text: "",
            author,
          },
        };
      },
    },
    onCardRemove(state, action) {
      delete state[action.payload];
    },
  },
});

export const { onCardAdd, onCardRemove } = cardsSlice.actions;

export default cardsSlice.reducer;
