import React from "react";
import { clientProfileAPI } from "../../api/api";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearArrGheDangDat,
  layDanhSachPhongVeAction,
} from "../../redux/bookingSlice";
import _ from "lodash";
import "./styleDanhSachGhe.css";

import { message } from "antd";

import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";

export default function Bill() {
  let dispatch = useDispatch();
  let params = useParams();
  let { userInfo } = useSelector((state) => state.userInfoSlice);
  let { dataPhongVe, arrGheDangDat } = useSelector(
    (state) => state.bookingSlice
  );
  let { thongTinPhim } = dataPhongVe;

  const handleDatVe = async () => {
    if (userInfo && arrGheDangDat.length > 0) {
      let thongTinDatVe = new ThongTinDatVe();
      thongTinDatVe.maLichChieu = params.maLichChieu;
      thongTinDatVe.danhSachVe = arrGheDangDat;
      try {
        await clientProfileAPI.datVe(thongTinDatVe);
        dispatch(layDanhSachPhongVeAction(thongTinDatVe.maLichChieu));
        dispatch(clearArrGheDangDat([]));
        message.success("Đặt Vé Thành Công");
      } catch (error) {
        console.log(error.message);
      }
    } else if (!userInfo) {
      message.info("Bạn chưa đăng nhập");
    } else {
      message.info("Bạn chưa chọn ghế");
    }
  };
  return (
    <>
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 15px",
        }}
        className="h-full md:h-screen relative mt-9 "
      >
        <div>
          <div className="text-center font-bold text-xl border-b-2 py-20 px-3">
            <span>
              {arrGheDangDat
                ?.reduce((tongTien, ghe) => {
                  return (tongTien += ghe.giaVe);
                }, 0)
                .toLocaleString()}{" "}
              VNĐ
            </span>
          </div>
          <div className="px-6">
            <div className="flex justify-between border-b-2 py-6 px-3">
              <span className="font-medium">Rạp</span>
              <span>{thongTinPhim?.tenCumRap}</span>
            </div>
            <div className="flex justify-between border-b-2 py-6 px-3">
              <span className="font-medium">Địa Chỉ</span>
              <span>{thongTinPhim?.diaChi}</span>
            </div>
            <div className="flex justify-between border-b-2 py-6 px-3">
              <span className="font-medium">Ngày Giờ Chiếu</span>
              <div>
                <span className="text-gray-500 font-medium">
                  {thongTinPhim?.gioChieu}
                </span>{" "}
                Ngày <span>{thongTinPhim?.ngayChieu}</span>
              </div>
            </div>
            <div className="flex justify-between border-b-2 py-6 px-3">
              <span className="font-medium">Tên Phim</span>
              <span className="text-green-500 font-medium">
                {thongTinPhim?.tenPhim}
              </span>
            </div>
            <div className="flex justify-between border-b-2 py-6 px-3">
              <span className="font-medium">Ghế Đặt Số</span>
              <div className="tabCumRap overflow-x-scroll ml-2 overflow-y-hidden max-h-12">
                {_.sortBy(arrGheDangDat, ["stt"]).map((gheDD, index) => {
                  if (gheDD.loaiGhe === "Vip") {
                    return (
                      <span
                        className="mb-1 px-1 bg-orange-300 font-medium rounded"
                        key={index}
                      >
                        {gheDD.stt}
                      </span>
                    );
                  } else {
                    return (
                      <span
                        className="mx-1 bg-gray-300 font-medium rounded"
                        key={index}
                      >
                        {gheDD.stt}
                      </span>
                    );
                  }
                })}
              </div>
            </div>
            <div className="flex justify-between border-b-2 py-6 px-3">
              <span className="font-medium mr-2">Rạp Chiếu</span>
              <span>{thongTinPhim?.tenRap}</span>
            </div>
          </div>

          <button
            onClick={handleDatVe}
            className="absolute left-0 bottom-0 w-full h-14 bg-green-500 hover:bg-green-400 text-white font-bold "
          >
            ĐẶT VÉ
          </button>
        </div>
      </div>
    </>
  );
}
