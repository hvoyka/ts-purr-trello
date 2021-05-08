import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { defaultComments } from "../../../utils/default-data";
import { CardComment, CommentsData } from "./types";

const initialState: CommentsData = {
  data: defaultComments,
};

export const commentsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addComment: {
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

    changeComment(state, action: PayloadAction<{ id: string; text: string }>) {
      const { id, text } = action.payload;
      state.data[id].text = text;
    },

    removeComment(state, action: PayloadAction<string>) {
      delete state.data[action.payload];
    },
  },
});

export const {
  addComment,
  changeComment,
  removeComment,
} = commentsSlice.actions;

export default commentsSlice.reducer;
