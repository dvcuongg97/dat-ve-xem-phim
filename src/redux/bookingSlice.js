import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clientAPI } from "../api/api";

export const layDanhSachPhongVeAction = createAsyncThunk(
  "layDanhSachPhongVeAction",
  async (maLichChieu) => {
    const res = await clientAPI.layDanhSachPhongVe(maLichChieu);
    if (res.status === 200) {
      return res.data.content;
    }
  }
);

const initialState = {
  dataPhongVe: {},
  arrGheDangDat: [],
  arrGheDaDat: [],
};

const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState,
  reducers: {
    setDataPhongVe: (state, { payload }) => {
      state.dataPhongVe = payload;
    },
    setArrGheDangDat: (state, { payload }) => {
      let index = state.arrGheDangDat.findIndex(
        (item) => item.maGhe === payload.maGhe
      );
      if (index === -1) {
        state.arrGheDangDat.push(payload);
      } else {
        state.arrGheDangDat.splice(index, 1);
      }
    },
    clearArrGheDangDat: (state, { payload }) => {
      state.arrGheDangDat = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(layDanhSachPhongVeAction.fulfilled, (state, action) => {
      state.dataPhongVe = action.payload;
    });
  },
});

export const { setDataPhongVe, setArrGheDangDat, clearArrGheDangDat } =
  bookingSlice.actions;

export default bookingSlice.reducer;
