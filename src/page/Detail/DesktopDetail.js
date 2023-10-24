import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getDetailMovie, getThongTinLichChieuPhim } from "../../api/api";
import { Progress, Rate } from "antd";
import {
  PlayCircleOutlined,
  CalendarOutlined,
  ProfileOutlined,
  AliwangwangOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { setUrlTrailer, setOpenVideoModal } from "../../redux/videoModalSlice";

import "./DesktopStyles.css";
import "../Home/DanhSachPhim/RatingStyle.css";

import VideoModal from "../../components/VideoModal/VideoModal";
import CommentMovie from "./CommentMovie";
import {
  setDataDetailMovie,
  setDataLichChieu,
} from "../../redux/detailMovieSlice";

const onChange = (key) => {
  // console.log(key);
};
const conicColors = { "0%": "#87d068", "50%": "#ffe58f", "100%": "#ffccc7" };

export default function Detail() {
  let params = useParams();
  let { detailMovie, dataLichChieu } = useSelector(
    (state) => state.detailMovieSlice
  );
  let dispatch = useDispatch();

  useEffect(() => {
    getDetailMovie(params.maPhim)
      .then((res) => {
        // console.log("detaiMovie", res);
        dispatch(setUrlTrailer(res.data.content));
        dispatch(setDataDetailMovie(res.data.content));
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);
  useEffect(() => {
    getThongTinLichChieuPhim(params.maPhim)
      .then((res) => {
        // console.log("lichChieu", res);
        dispatch(setDataLichChieu(res.data.content));
        dispatch(setDataDetailMovie(res.data.content));
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

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
                      <p className="text-slate-300">{cumRap.diaChi}</p>
                    </div>
                  </div>
                  <div className=" flex-col">
                    {cumRap.lichChieuPhim
                      ?.slice(0, 6)
                      .map((lichChieu, index) => {
                        return (
                          <>
                            <NavLink
                              to={`/booking/${lichChieu.maLichChieu}`}
                              key={index}
                              className="px-3 py-1 mr-2 text-center rounded font-medium bg-orange-500"
                            >
                              Đặt Vé
                            </NavLink>
                            <span className="text-green-800 font-bold capitalize">
                              {moment(lichChieu.ngayChieuGioChieu).format(
                                "dddd, DD MMMM, YYYY"
                              )}
                            </span>
                          </>
                        );
                      })}
                  </div>
                </div>
              );
            })}
          </>
        ),
      };
    });
  };

  let renderDetailMovieTop = () => {
    return (
      <div className="detail-container">
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

  let renderDetailBottom = () => {
    return (
      <div
        style={{
          backgroundColor: " rgb(10, 32, 41)",
          padding: "50px 0",
        }}
      >
        <div className="detail-bottom">
          <Tabs id="lichChieu" defaultActiveKey="tab1" centered="true">
            <Tabs.TabPane
              tab={
                <span className="text-slate-300 hover:text-orange-600 font-medium text-lg">
                  <CalendarOutlined className="mr-1" />
                  Lịch Chiếu
                </span>
              }
              key={"tab1"}
            >
              <Tabs
                tabPosition="left"
                className="overflow-hidden bg-white p-4 rounded-md"
                defaultActiveKey="1"
                items={renderTabsLichChieu()}
                onChange={onChange}
              />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={
                <span className="text-slate-300 hover:text-orange-600 font-medium text-lg">
                  <ProfileOutlined />
                  Chi Tiết
                </span>
              }
              key={"tab2"}
            >
              <div className="p-6  text-white">
                <div className="grid grid-cols-2  gap-3">
                  <div>
                    <p className="text-lg ">
                      <span className="font-medium text-lg ">Tên Phim:</span>{" "}
                      {detailMovie.tenPhim}{" "}
                    </p>

                    <p className="text-lg">
                      <span className="font-medium text-lg ">Trạng thái:</span>{" "}
                      {detailMovie.dangChieu ? "Đang Chiếu" : "Sắp Chiếu"}{" "}
                    </p>
                    <p className="text-lg">
                      <span className="font-medium text-lg ">Khởi Chiếu:</span>{" "}
                      {moment(detailMovie.ngayKhoiChieu).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}{" "}
                    </p>
                    {/* <p className="text-lg">
                      <span className="font-medium text-lg ">Tên Phim:</span>{" "}
                      {detailMovie.tenPhim}{" "}
                    </p> */}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-lg">Nội Dung</span>
                    <p className="text-lg">{detailMovie.moTa}</p>
                  </div>
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={
                <span className="text-slate-300 hover:text-orange-600 font-medium text-lg">
                  <AliwangwangOutlined />
                  Bình Luận
                </span>
              }
              key={"tab3"}
            >
              <CommentMovie />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    );
  };

  return (
    <>
      <div style={{ height: 82 }}></div>
      <VideoModal />
      {renderDetailMovieTop()}
      {renderDetailBottom()}
    </>
  );
}
