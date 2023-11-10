import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clientAPI } from "../api/api";

export const layDanhSachPhimAction = createAsyncThunk(
  "user/layDanhSachPhimAction",
  async () => {
    const res = await clientAPI.layDanhSachPhim();
    if (res.status === 200) {
      return res.data.content;
    }
  }
);

const initialState = {
  danhSachPhim: [],
};

const danhSachPhimSlice = createSlice({
  name: "danhSachPhimSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(layDanhSachPhimAction.fulfilled, (state, action) => {
      // Add user to the state array
      state.danhSachPhim = action.payload;
    });
  },
});

// export const { setDanhSachPhim } = danhSachPhimSlice.actions;

export default danhSachPhimSlice.reducer;
