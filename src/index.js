import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./redux/userInfoSlice";
import bookingSlice from "./redux/bookingSlice";
import videoModalSlice from "./redux/videoModalSlice";
import detailMovieSlice from "./redux/detailMovieSlice";
import danhSachPhimSlice from "./redux/danhSachPhimSlice";
import spinnerSlice from "./redux/spinnerSlice";
//
export let store = configureStore({
  reducer: {
    userInfoSlice,
    bookingSlice,
    videoModalSlice,
    detailMovieSlice,
    danhSachPhimSlice,
    spinnerSlice,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
