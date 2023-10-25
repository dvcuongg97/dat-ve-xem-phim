import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arrHeThongRap: [],
};

const tabCumRapSlice = createSlice({
  name: "tabCumRapSlice",
  initialState,
  reducers: {
    setArrHeThongRap: (state, { payload }) => {
      state.arrHeThongRap = payload;
    },
  },
});

export const { setArrHeThongRap } = tabCumRapSlice.actions;

export default tabCumRapSlice.reducer;
