import React, { Fragment, useEffect, useRef, useState } from "react";
import { getDataPhongVeApi } from "../../api/api";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearArrGheDangDat,
  setArrGheDangDat,
  setDataPhongVe,
} from "../../redux/bookingSlice";
import _ from "lodash";
import "./styleDanhSachGhe.css";
import axios from "axios";
import { BASE_URL, TOKEN_CYBERSOFT, https } from "../../api/configApi";
import { CheckOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import { message } from "antd";
import { userLocalStorage } from "../../api/localService";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";

export default function Checkout() {
  let navigate = useNavigate();
  let [modalState, setModal] = useState(false);
  let [modalState2, setModal2] = useState(false);
  let { userInfo } = useSelector((state) => state.userInfoSlice);
  let dispatch = useDispatch();
  let params = useParams();
  let { dataPhongVe, arrGheDangDat } = useSelector(
    (state) => state.bookingSlice
  );
  let { danhSachGhe, thongTinPhim } = dataPhongVe;

  useEffect(() => {
    getDataPhongVeApi(params.maLichChieu)
      .then((res) => {
        // console.log(res);
        dispatch(setDataPhongVe(res.data.content));
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

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
              classGheUserDat != "" ? (
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
      <div className="hidden md:block w-full h-[82px] bg-white"></div>
      <div className="flex-col lg:grid lg:grid-cols-3 gap-4 mt-9">
        {/* SEATS */}
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
                  <UserOutlined
                    style={{ marginBottom: 5, fontWeight: "bold" }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BILL */}
        <div
          style={{
            boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 15px",
          }}
          className="h-full md:h-[100vh] relative mt-9 "
        >
          <div>
            {/* MODAL1 START*/}
            {modalState && (
              <div class="modal__popup z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative w-full md:max-w-md max-h-full">
                  <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="p-6 w-full  text-center shadow-xl shadow-black">
                      <svg
                        class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 capitalize text-center">
                        bạn chưa đăng nhập!
                      </h3>
                      <div className="flex-col md:grid grid-cols-2 gap-9">
                        <button
                          onClick={() => navigate("/login")}
                          type="button"
                          class="text-white md:mb-0 mb-3 capitalize bg-red-600 hover:bg-red-800  font-medium rounded-lg text-sm  px-5 py-2.5 text-center mr-2"
                        >
                          đăng nhập
                        </button>
                        <button
                          onClick={() => setModal(!modalState)}
                          type="button"
                          class="text-gray-500 text-center capitalize bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >
                          Hủy Bỏ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* END */}
            {/*  */}
            {/* MODAL2 START */}
            {modalState2 && (
              <div class="modal__popup z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative w-full md:max-w-md max-h-full">
                  <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="p-6 w-full  text-center shadow-xl shadow-black">
                      <svg
                        class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 capitalize text-center">
                        bạn chưa chọn ghế!
                      </h3>
                      <div className="flex justify-center">
                        <button
                          onClick={() => setModal2(!modalState2)}
                          type="button"
                          class="text-gray-500 text-center capitalize bg-red-500 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >
                          OK
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* END */}
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
              onClick={async () => {
                if (userInfo && arrGheDangDat.length > 0) {
                  let thongTinDatVe = new ThongTinDatVe();
                  thongTinDatVe.maLichChieu = params.maLichChieu;
                  thongTinDatVe.danhSachVe = arrGheDangDat;
                  try {
                    axios.post(
                      `${BASE_URL}/api/QuanLyDatVe/DatVe/`,
                      thongTinDatVe,
                      {
                        headers: {
                          TokenCybersoft: TOKEN_CYBERSOFT,
                          Authorization:
                            "Bearer " + userLocalStorage.get()?.accessToken,
                        },
                      }
                    );
                    let res = await getDataPhongVeApi(
                      thongTinDatVe.maLichChieu
                    );
                    dispatch(setDataPhongVe(res.data.content));
                    dispatch(clearArrGheDangDat([]));

                    message.success("Đặt Vé Thành Công");
                  } catch (error) {}
                } else if (!userInfo) {
                  setModal(!modalState);
                } else {
                  setModal2(!modalState2);
                }
              }}
              className="absolute bottom-0 w-full h-14 bg-green-500 hover:bg-green-400 text-white font-bold "
            >
              ĐẶT VÉ
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
