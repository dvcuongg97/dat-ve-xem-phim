import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  urlTrailer: "",
  isOpen: false,
};

const videoModalSlice = createSlice({
  name: "videoModalSlice",
  initialState,
  reducers: {
    setUrlTrailer: (state, { payload }) => {
      let { trailer } = payload;
      let index = 0;
      for (let i = 0; i < trailer.length; i++) {
        if (trailer[i] === "=") {
          index = i;
        }
      }
      if (index === -1) {
        index = trailer?.lastIndexOf("/");
      }
      state.urlTrailer = trailer?.slice(index + 1, trailer.length);
    },
    setOpenVideoModal: (state, { payload }) => {
      state.isOpen = payload;
    },
  },
});

export const { setUrlTrailer, setOpenVideoModal } = videoModalSlice.actions;

export default videoModalSlice.reducer;
