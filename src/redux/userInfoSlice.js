import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userLocalStorage } from "../api/localService";
import { clientProfileAPI } from "../api/api";

export const layThongTinTaiKhoanAction = createAsyncThunk(
  "client/layThongTinTaiKhoanAction",
  async () => {
    const res = await clientProfileAPI.thongTinTaiKhoan();
    if (res.status === 200) {
      return res.data.content;
    }
  }
);

const initialState = {
  userInfo: userLocalStorage.get(),
  userProfile: {},
};

const userInfoSlice = createSlice({
  name: "userInfoSlice",
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(layThongTinTaiKhoanAction.fulfilled, (state, action) => {
      state.userProfile = action.payload;
    });
  },
});

export const { setUserLogin } = userInfoSlice.actions;

export default userInfoSlice.reducer;
