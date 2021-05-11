import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { defaultCards } from "../../../utils/default-data";
import {
  ColumnCard,
  CardsData,
  ChangeTitlePayload,
  ChangeTextPayload,
} from "./types";

const initialState: CardsData = {
  data: defaultCards,
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: {
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
    changeCardTitle(state, action: PayloadAction<ChangeTitlePayload>) {
      const { id, title } = action.payload;
      state.data[id].title = title;
    },

    changeCardText(state, action: PayloadAction<ChangeTextPayload>) {
      const { id, text } = action.payload;
      state.data[id].text = text;
    },

    removeCard(state, action: PayloadAction<string>) {
      delete state.data[action.payload];
    },
  },
});

export const {
  addCard,
  removeCard,
  changeCardTitle,
  changeCardText,
} = cardsSlice.actions;

export default cardsSlice.reducer;
