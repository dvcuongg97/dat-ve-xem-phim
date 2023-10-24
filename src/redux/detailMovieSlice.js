import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detailMovie: {},
  dataLichChieu: {},
};

const detailMovieSlice = createSlice({
  name: "detailMovieSlice",
  initialState,
  reducers: {
    setDataDetailMovie: (state, { payload }) => {
      state.detailMovie = payload;
    },
    setDataLichChieu: (state, { payload }) => {
      state.dataLichChieu = payload;
    },
  },
});

export const { setDataDetailMovie, setDataLichChieu } =
  detailMovieSlice.actions;

export default detailMovieSlice.reducer;
