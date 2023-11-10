import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Progress, Rate } from "antd";
import {
  CalendarOutlined,
  ProfileOutlined,
  AliwangwangOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { setOpenVideoModal } from "../../redux/videoModalSlice";

import "./DesktopStyles.css";
import "../Home/DanhSachPhim/RatingStyle.css";

import VideoModal from "../../components/VideoModal/VideoModal";
import CommentMovie from "./CommentMovie";

const onChange = (key) => {
  // console.log(key);
};
const conicColors = { "0%": "#87d068", "50%": "#ffe58f", "100%": "#ffccc7" };

export default function Detail() {
  let dispatch = useDispatch();
  let [tabLichChieu, setTabLichChieu] = useState(true);
  let [tabChiTiet, setTabChiTiet] = useState(false);
  let [tabBinhLuan, setTabBinhLuan] = useState(false);
  let { detailMovie, dataLichChieu } = useSelector(
    (state) => state.detailMovieSlice
  );

  let renderTabsLichChieu = () => {
    return dataLichChieu.heThongRapChieu?.map((htr, index) => {
      return {
        key: index,
        label: (
          <div className="flex items-center ">
            <img
              src={htr.logo}
              alt={htr.logo}
              className="w-20 mr-3 hover:scale-110"
            />
            <p className="text-black hover:text-orange-600 hover:scale-110 font-medium text-lg">
              {htr.tenHeThongRap}
            </p>
          </div>
        ),
        children: (
          <>
            {htr.cumRapChieu?.map((cumRap, index) => {
              return (
                <div key={index} className="mb-3">
                  <div className="flex mb-3">
                    <img
                      className="w-24 h-24 mr-6"
                      alt={cumRap.hinhAnh}
                      src={cumRap.hinhAnh}
                    />
                    <div className="flex flex-col justify-center">
                      <p className="text-green-500 font-medium">
                        {cumRap.tenCumRap}
                      </p>
                      <p className="text-slate-500">{cumRap.diaChi}</p>
                    </div>
                  </div>
                  <>
                    {cumRap.lichChieuPhim
                      ?.slice(0, 6)
                      .map((lichChieu, index) => {
                        return (
                          <div key={index} className=" flex-col mb-3">
                            <NavLink
                              to={`/booking/${lichChieu.maLichChieu}`}
                              className="px-3 py-1 mr-2 text-center rounded font-medium bg-orange-500"
                            >
                              Đặt Vé
                            </NavLink>
                            <span className="text-green-800 font-bold capitalize">
                              {moment(lichChieu.ngayChieuGioChieu).format(
                                "dddd, DD MMMM, YYYY"
                              )}
                            </span>
                          </div>
                        );
                      })}
                  </>
                </div>
              );
            })}
          </>
        ),
      };
    });
  };

  let renderContentTop = () => {
    return (
      <div className="detail-container px-6">
        <div
          className="detail-bg "
          style={{
            backgroundImage: `url(${detailMovie.hinhAnh})`,
          }}
        ></div>
        <div className="detail-content ">
          <div
            style={{
              backgroundImage: `url(${detailMovie.hinhAnh})`,
            }}
            className="detail-content-left "
          >
            <button
              className="content-left-button"
              onClick={() => {
                dispatch(setOpenVideoModal(true));
              }}
            >
              <img src="../image/play-video1.png" alt="..." />
              {/* <PlayCircleOutlined /> */}
            </button>
          </div>
          <div className="detail-content-middle ">
            <p className="text-white font-medium">
              {moment(detailMovie.ngayKhoiChieu).format("MMM Do YY")}
            </p>
            <p className="text-2xl text-white font-medium">
              <span className="span-c18">TIX</span>
              {detailMovie.tenPhim}
            </p>
            {detailMovie.dangChieu ? (
              <p className="text-white font-medium">Đang Chiếu</p>
            ) : (
              <p className="text-white font-medium">Sắp Chiếu</p>
            )}
            <a
              href="#lichChieu"
              className="content-middle-button font-medium hover:bg-red-500"
            >
              Mua Vé
            </a>
          </div>
          <div className="detail-content-right">
            <Progress
              size={"200px"}
              format={(percent) => (
                <span className="font-medium text-white">{percent} Điểm</span>
              )}
              type="circle"
              percent={detailMovie.danhGia * 20}
              strokeColor={conicColors}
            />
            <div className="mt-6">
              <Rate value={detailMovie.danhGia} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  let renderContentBottom = () => {
    return (
      <div
        style={{
          backgroundColor: " rgb(10, 32, 41)",
          padding: "50px 0",
        }}
      >
        <div className="detail-bottom">
          <div
            id="lichChieu"
            className="mb-4 border-b border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-center">
              <ul
                className="flex justify-around w-1/2 text-sm font-medium text-center"
                id="myTab"
                data-tabs-toggle="#myTabContent"
                role="tablist"
              >
                <button
                  onClick={() => {
                    setTabLichChieu(true);
                    setTabChiTiet(false);
                    setTabBinhLuan(false);
                  }}
                  className="block text-slate-300 hover:text-orange-600 font-medium text-lg"
                >
                  <CalendarOutlined className="mr-1" />
                  Lịch Chiếu
                </button>

                <button
                  onClick={() => {
                    setTabChiTiet(true);
                    setTabLichChieu(false);
                    setTabBinhLuan(false);
                  }}
                  className="block text-slate-300 hover:text-orange-600 font-medium text-lg"
                >
                  <ProfileOutlined />
                  Chi Tiết
                </button>

                <button
                  onClick={() => {
                    setTabBinhLuan(true);
                    setTabLichChieu(false);
                    setTabChiTiet(false);
                  }}
                  className="block text-slate-300 hover:text-orange-600 font-medium text-lg"
                >
                  <AliwangwangOutlined />
                  Bình Luận
                </button>
              </ul>
            </div>
          </div>
          <div id="myTabContent">
            {tabLichChieu && (
              <div>
                <Tabs
                  tabPosition="left"
                  className="overflow-hidden  bg-gray-50 p-4 rounded-md"
                  defaultActiveKey="1"
                  items={renderTabsLichChieu()}
                  onChange={onChange}
                />
              </div>
            )}

            <div id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
              {tabChiTiet && (
                <div className="p-6 text-white">
                  <div className="grid grid-cols-2  gap-3">
                    <div className="grid grid-cols-12">
                      <div className="col-span-3">
                        <span className="block font-medium text-lg text-green-500 ">
                          Tên Phim:
                        </span>{" "}
                        <span className="block font-medium text-lg text-green-500 ">
                          Trạng thái:
                        </span>{" "}
                        <span className="block font-medium text-lg text-green-500 ">
                          Khởi Chiếu:
                        </span>{" "}
                      </div>
                      <div className="col-span-9">
                        <p className="text-lg ">{detailMovie.tenPhim} </p>
                        <p className="text-lg text-justify">
                          {detailMovie.dangChieu ? "Đang Chiếu" : "Sắp Chiếu"}{" "}
                        </p>
                        <p className="text-lg">
                          {/* {moment(detailMovie.ngayKhoiChieu).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}{" "} */}
                          {moment(detailMovie.ngayKhoiChieu)
                            .locale("vi")
                            .format("DD MMMM, YYYY")}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-lg">Nội Dung</span>
                      <p className="text-lg">{detailMovie.moTa}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div id="settings" role="tabpanel" aria-labelledby="settings-tab">
              {tabBinhLuan && <CommentMovie />}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div style={{ height: 82 }}></div>
      <VideoModal />
      {renderContentTop()}
      {renderContentBottom()}
    </>
  );
}
