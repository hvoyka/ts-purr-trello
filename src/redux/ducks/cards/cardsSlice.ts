import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { defaultCards } from "../../../utils/default-data";

export type ColumnCards = Record<string, ColumnCard>;

export interface ColumnCard {
  id: string;
  columnId: string;
  title: string;
  text: string;
  author: string;
}

const initialState = {
  data: defaultCards as ColumnCards,
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    onCardAdd: {
      reducer(state, action: PayloadAction<ColumnCard>) {
        state.data[action.payload.id] = action.payload;
      },
      prepare(columnId: string, title: string, author: string) {
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
    onCardTitleChange: {
      reducer(state, action: PayloadAction<{ id: string; title: string }>) {
        const { id, title } = action.payload;
        state.data[id].title = title;
      },
      prepare(id: string, title: string) {
        return {
          payload: {
            id,
            title,
          },
        };
      },
    },
    onCardTextChange: {
      reducer(state, action: PayloadAction<{ id: string; text: string }>) {
        const { id, text } = action.payload;
        state.data[id].text = text;
      },
      prepare(id: string, text: string) {
        return {
          payload: {
            id,
            text,
          },
        };
      },
    },
    onCardRemove(state, action) {
      delete state.data[action.payload];
    },
    onColumnRemoveClearCards(state, action) {
      const columnId = action.payload;
      Object.values(state.data).forEach((card) => {
        if ((card.columnId = columnId)) {
          delete state.data[card.id];
        }
      });
    },
  },
});

export const {
  onCardAdd,
  onCardRemove,
  onCardTitleChange,
  onCardTextChange,
  onColumnRemoveClearCards,
} = cardsSlice.actions;

export default cardsSlice.reducer;
