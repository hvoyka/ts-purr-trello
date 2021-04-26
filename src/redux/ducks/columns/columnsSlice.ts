import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultColumns } from "../../../utils/default-data";
import { v1 as uuid } from "uuid";

export type DeskColumns = Record<string, DeskColumn>;

export interface DeskColumn {
  id: string;
  title: string;
}

const initialState: DeskColumns = defaultColumns;

export const columnSlice = createSlice({
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
            id: uuid(),
            title,
          },
        };
      },
    },
    onColumnRemove(state, action) {
      delete state[action.payload];
    },
  },
});

export const { onColumnAdd, onColumnRemove } = columnSlice.actions;

export default columnSlice.reducer;
