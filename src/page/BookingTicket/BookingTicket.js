import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { layDanhSachPhongVeAction } from "../../redux/bookingSlice";
// import "./styleDanhSachGhe.css";

import Seats from "./Seats";
import Bill from "./Bill";

export default function Checkout() {
  let dispatch = useDispatch();
  let params = useParams();

  useEffect(() => {
    dispatch(layDanhSachPhongVeAction(params.maLichChieu));
  }, [params.maLichChieu]);

  return (
    <>
      <div className="hidden md:block h-20 w-full bg-white"></div>
      <div className="flex-col lg:grid lg:grid-cols-3 gap-4 mt-9">
        <Seats />
        <Bill />
      </div>
    </>
  );
}
