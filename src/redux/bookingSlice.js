import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { datVeApi, getDataPhongVeApi } from "../api/api";
import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";

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
      // console.log("slice check index ghe", index);
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
});

export const { setDataPhongVe, setArrGheDangDat, clearArrGheDangDat } =
  bookingSlice.actions;

export default bookingSlice.reducer;
