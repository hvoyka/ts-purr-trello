import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { initColumnsData } from "../../../utils/init-default-data";

export type DeskColumns = Record<string, DeskColumn>;

export interface DeskColumn {
  id: string;
  title: string;
}

const initialState: DeskColumns = initColumnsData();

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    onColumnAdd: {
      reducer(state, action: PayloadAction<DeskColumn>) {
        state[action.payload.id] = action.payload;
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
      delete state[action.payload];
    },
    onColumnTitleChange: {
      reducer(state, action: PayloadAction<DeskColumn>) {
        const { id, title } = action.payload;
        state[id].title = title;
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
