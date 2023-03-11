import { createSlice } from "@reduxjs/toolkit";

//On application startup check if user has id saved in device storage, if not generate uuid and save it to device storage
//If user has id saved in device storage, load it into redux store
//If user has name saved in device storage, load it into redux store

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
