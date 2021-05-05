import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { defaultColumns } from "../../../utils/default-data";
import { DeskColumns, DeskColumn } from "./types";

const initialState = {
  data: defaultColumns as DeskColumns,
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
    onColumnTitleChange(
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) {
      const { id, title } = action.payload;
      state.data[id].title = title;
    },
  },
});

export const {
  onColumnAdd,
  onColumnRemove,
  onColumnTitleChange,
} = columnsSlice.actions;

export default columnsSlice.reducer;
