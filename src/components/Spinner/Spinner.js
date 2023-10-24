import React from "react";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";

export default function Spinner() {
  let { isLoading } = useSelector((state) => state.spinnerSlice);

  return isLoading ? (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#000",
        opacity: 0.9,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
      }}
    >
      <BeatLoader color="#36d7b7" size={30} />
    </div>
  ) : (
    <></>
  );
}
