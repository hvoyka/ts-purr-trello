import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { initColumnsData } from "../../../utils/init-default-data";

export type DeskColumns = Record<string, DeskColumn>;

export interface DeskColumn {
  id: string;
  title: string;
}

const initialState = {
  data: initColumnsData(),
};

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    onColumnAdd: {
      reducer(state, action: PayloadAction<DeskColumn>) {
        state.data[action.payload.id] = action.payload;
      },
      prepare(title) {
        return {
          payload: {
            id: nanoid(),
            title,
          },
        };
      },
    },
    onColumnRemove(state, action) {
      delete state.data[action.payload];
    },
    onColumnTitleChange: {
      reducer(state, action: PayloadAction<DeskColumn>) {
        const { id, title } = action.payload;
        state.data[id].title = title;
      },
      prepare(id, title) {
        return {
          payload: {
            id,
            title,
          },
        };
      },
    },
  },
});

export const {
  onColumnAdd,
  onColumnRemove,
  onColumnTitleChange,
} = columnsSlice.actions;

export default columnsSlice.reducer;
