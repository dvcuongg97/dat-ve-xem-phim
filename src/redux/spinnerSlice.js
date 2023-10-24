import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const spinnerSlice = createSlice({
  name: "spinnerSlice",
  initialState,
  reducers: {
    setLoadingOn: (state, action) => {
      state.isLoading = true;
    },
    setLoadingOff: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { setLoadingOff, setLoadingOn } = spinnerSlice.actions;

export default spinnerSlice.reducer;
