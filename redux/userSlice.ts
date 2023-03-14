import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: "",
    userName: "",
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { setUserId, setUserName } = userSlice.actions;
