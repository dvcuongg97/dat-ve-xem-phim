import React, { Fragment } from "react";
import "./styleDanhSachGhe.css";

import { useDispatch, useSelector } from "react-redux";
import { userLocalStorage } from "../../api/localService";
import { setArrGheDangDat } from "../../redux/bookingSlice";

import { CheckOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";

export default function Seats() {
  let dispatch = useDispatch();
  let userInfo = userLocalStorage.get();
  let { dataPhongVe, arrGheDangDat } = useSelector(
    (state) => state.bookingSlice
  );
  let { danhSachGhe, thongTinPhim } = dataPhongVe;

  let renderSeats = () => {
    return danhSachGhe?.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = ghe.daDat ? "gheDaDat" : "";
      let classGheUserDat = "";
      if (userInfo?.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheUserDat = "gheUserDat";
      }
      let classGheDangDat = "";
      let indexGDD = arrGheDangDat.findIndex(
        (item) => item.maGhe === ghe.maGhe
      );
      if (indexGDD !== -1) {
        classGheDangDat = "gheDangDat";
      }
      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              dispatch(setArrGheDangDat(ghe));
            }}
            key={index}
            disabled={ghe.daDat}
            className={`ghe ${classGheDaDat} ${classGheVip} ${classGheDangDat}  ${classGheUserDat} hover:ring-2 hover:ring-green-600`}
          >
            {ghe.daDat ? (
              classGheUserDat !== "" ? (
                <UserOutlined style={{ marginBottom: 5, fontWeight: "bold" }} />
              ) : (
                <CloseOutlined
                  style={{ marginBottom: 5, fontWeight: "bold" }}
                />
              )
            ) : (
              ghe.stt
            )}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };
  return (
    <>
      <div
        style={{
          padding: "0 5%",
          margin: "0 5%",
        }}
        className="col-span-2 mb-9 overflow-x-scroll tabCumRap"
      >
        <div className="relative min-w-[768px] md:w-full md:h-full">
          <div className="flex-col items-center justify-center">
            <div className="flex justify-between mb-6">
              <div className="flex">
                <img
                  className="w-20 h-20 mr-2 object-cover"
                  src={thongTinPhim?.hinhAnh}
                  alt="..."
                />
                <div className="flex flex-col">
                  <span className="text-green-500 font-medium">
                    {thongTinPhim?.tenCumRap}
                  </span>
                  <span className="text-gray-500 font-medium">
                    {thongTinPhim?.diaChi}
                  </span>
                  <span className="text-sm text-gray-500">
                    <span className="text-sm text-red-500">
                      {thongTinPhim?.gioChieu}
                    </span>{" "}
                    Ngày {""} {thongTinPhim?.ngayChieu}
                  </span>
                </div>
              </div>
              <div>
                {userInfo ? (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="block cursor-pointer px-8 py-3 bg-green-500 hover:bg-green-400 capitalize text-lg font-medium"
                    href={"/userinfo"}
                  >
                    lịch sử đặt vé
                  </a>
                ) : (
                  <div className="block px-8 py-3 bg-gray-500 capitalize text-lg font-medium">
                    lịch sử đặt vé
                  </div>
                )}
              </div>
            </div>
            <img
              className="w-full h-auto"
              src="../image/bookingscreen.png"
              alt="..."
            />
            <div className="flex items-center justify-center">
              <div>{renderSeats()}</div>
            </div>
          </div>
          <div className="mt-5 flex justify-evenly">
            <></>
            <div>
              <span className="font-medium">Ghế Đang Chọn</span>
              <button className="ghe gheDangDat text-center">
                <CheckOutlined
                  style={{ marginBottom: 5, fontWeight: "bold" }}
                />
              </button>
            </div>
            <div>
              <span className="font-medium">Ghế Vip</span>

              <button className="ghe gheVip text-center">
                <CheckOutlined
                  style={{ marginBottom: 5, fontWeight: "bold" }}
                />
              </button>
            </div>
            <div>
              <span className="font-medium">Ghế Đã Đặt</span>
              <button className="ghe gheDaDat text-center">
                <CloseOutlined
                  style={{ marginBottom: 5, fontWeight: "bold" }}
                />
              </button>
            </div>
            <div>
              <span className="font-medium">Ghế Bạn Đã Đặt</span>
              <button className="ghe gheDaDat gheUserDat text-center">
                <UserOutlined style={{ marginBottom: 5, fontWeight: "bold" }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
