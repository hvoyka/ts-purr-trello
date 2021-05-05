import { createSlice } from "@reduxjs/toolkit";
import { User } from "./types";

const initialState: User = { name: "" };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    onAddUser(state, action) {
      state.name = action.payload;
    },
  },
});

export const { onAddUser } = userSlice.actions;

export default userSlice.reducer;
