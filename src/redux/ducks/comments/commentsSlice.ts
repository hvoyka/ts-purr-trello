import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { defaultComments } from "../../../utils/default-data";

export interface CardComment {
  id: string;
  cardId: string;
  text: string;
  author: string;
}

export type CardComments = Record<string, CardComment>;

const initialState = {
  data: defaultComments as CardComments,
};

export const commentsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    onCommentAdd: {
      reducer(state, action: PayloadAction<CardComment>) {
        state.data[action.payload.id] = action.payload;
      },
      prepare(cardId: string, text: string, author: string) {
        return {
          payload: {
            id: nanoid(),
            cardId,
            text,
            author,
          },
        };
      },
    },
    onCommentChange: {
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
    onCommentRemove(state, action) {
      delete state.data[action.payload];
    },
    onCardRemoveClearComments(state, action) {
      const cardId = action.payload;
      Object.values(state.data).forEach((comment) => {
        if (comment.cardId === cardId) {
          delete state.data[comment.id];
        }
      });
    },
  },
});

export const {
  onCommentAdd,
  onCommentChange,
  onCommentRemove,
  onCardRemoveClearComments,
} = commentsSlice.actions;

export default commentsSlice.reducer;
