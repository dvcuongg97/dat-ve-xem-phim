import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  danhSachPhim: [],
};

const danhSachPhimSlice = createSlice({
  name: "danhSachPhimSlice",
  initialState,
  reducers: {
    setDanhSachPhim: (state, { payload }) => {
      state.danhSachPhim = payload;
    },
  },
});

export const { setDanhSachPhim } = danhSachPhimSlice.actions;

export default danhSachPhimSlice.reducer;
