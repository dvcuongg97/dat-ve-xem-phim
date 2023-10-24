import { createSlice } from "@reduxjs/toolkit";
import { userLocalStorage } from "../api/localService";

const initialState = {
  userInfo: userLocalStorage.get(),
};

const userInfoSlice = createSlice({
  name: "userInfoSlice",
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserLogin } = userInfoSlice.actions;

export default userInfoSlice.reducer;
