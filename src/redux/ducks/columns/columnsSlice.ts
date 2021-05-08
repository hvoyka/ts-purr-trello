import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { defaultColumns } from "../../../utils/default-data";
import { DeskColumn, ColumnsData } from "./types";

const initialState: ColumnsData = {
  data: defaultColumns,
};

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    addColumn: {
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

    removeColumn(state, action: PayloadAction<string>) {
      delete state.data[action.payload];
    },

    changeColumnTitle(state, action: PayloadAction<DeskColumn>) {
      const { id, title } = action.payload;
      state.data[id].title = title;
    },
  },
});

export const {
  addColumn,
  removeColumn,
  changeColumnTitle,
} = columnsSlice.actions;

export default columnsSlice.reducer;
