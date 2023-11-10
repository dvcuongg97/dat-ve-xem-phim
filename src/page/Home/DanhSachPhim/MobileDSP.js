import React, { useState } from "react";
import "./MobileCardStyle.css";
import "./TextStyle.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function MobileDSP() {
  const { danhSachPhim } = useSelector((state) => state.danhSachPhimSlice);
  let [visible, setVisible] = useState(3);

  const handleReadmore = () => {
    setVisible(visible + 3);
  };

  const renderCardPhim = () => {
    return danhSachPhim?.slice(0, visible)?.map((item, index) => {
      return (
        <div key={index} className="mobile-card-container ">
          <img
            className="mobile-card-img"
            src={item.hinhAnh}
            alt={item.hinhAnh}
          />
          <div className="mobile-card-content relative">
            <div className="div-ten-phim">
              <span className="span-c18">TIX</span>
              {item.tenPhim}
            </div>
            <h4 className="text-detail-phim-h4">
              {item.moTa.slice(0, 100)}...
            </h4>
            <NavLink
              to={`movie/${item.maPhim}`}
              className="mobile-button absolute bottom-0 left-2"
            >
              Mua Vé
            </NavLink>
          </div>
        </div>
      );
    });
  };
  return (
    <>
      <div id="lichChieu" className="container mx-auto mt-6 px-6">
        <p className="uppercase text-xl font-bold text-gray-500 text-center mb-6">
          danh sách phim
        </p>
        {renderCardPhim()}
        <div className="flex justify-center items-center">
          <button
            className="py-1 px-3 font-medium mt-3 rounded-lg bg-[#fb4226] text-white capitalize"
            onClick={handleReadmore}
          >
            xem thêm
          </button>
        </div>
      </div>
    </>
  );
}
