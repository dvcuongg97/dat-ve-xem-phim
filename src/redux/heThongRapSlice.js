import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clientAPI } from "../api/api";

export const fetchHeThongRap = createAsyncThunk(
  "client/fetchHeThongRap",
  async () => {
    const res = await clientAPI.layThongTinLichChieuHeThongRap();
    if (res.status === 200) {
      return res.data.content;
    }
  }
);

const initialState = {
  arrHeThongRap: [],
};

const heThongRapSlice = createSlice({
  name: "heThongRapSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHeThongRap.fulfilled, (state, action) => {
      state.arrHeThongRap = action.payload;
    });
  },
});

// export const {} = heThongRapSlice.actions;

export default heThongRapSlice.reducer;
