import { createSlice } from "@reduxjs/toolkit";
import { initUserNameData } from "../../../utils/init-default-data";

const initialState: string = initUserNameData();

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    onAddUser(state, action) {
      state = action.payload;
    },
  },
});

export const { onAddUser } = userSlice.actions;

export default userSlice.reducer;
