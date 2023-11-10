import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clientAPI } from "../api/api";

export const layThongTinPhimAction = createAsyncThunk(
  "layThongTinPhimAction",
  async (maPhim) => {
    const res = await clientAPI.layThongTinPhim(maPhim);
    if (res.status === 200) {
      return res.data.content;
    }
  }
);

export const layThongTinLichChieuPhimAction = createAsyncThunk(
  "layThongTinLichChieuPhimAction",
  async (maPhim) => {
    const res = await clientAPI.layThongTinLichChieuPhim(maPhim);
    if (res.status === 200) {
      return res.data.content;
    }
  }
);

const initialState = {
  detailMovie: {},
  dataLichChieu: {},
};

const detailMovieSlice = createSlice({
  name: "detailMovieSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(layThongTinPhimAction.fulfilled, (state, action) => {
      // Add user to the state array
      state.detailMovie = action.payload;
    });
    builder.addCase(
      layThongTinLichChieuPhimAction.fulfilled,
      (state, action) => {
        // Add user to the state array
        state.dataLichChieu = action.payload;
      }
    );
  },
});

// export const { setDataDetailMovie, setDataLichChieu } =
//   detailMovieSlice.actions;

export default detailMovieSlice.reducer;
