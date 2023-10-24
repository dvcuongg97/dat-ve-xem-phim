import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getDetailMovie, getThongTinLichChieuPhim } from "../../api/api";
import {
  CalendarOutlined,
  ProfileOutlined,
  AliwangwangOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import {
  setDataDetailMovie,
  setDataLichChieu,
} from "../../redux/detailMovieSlice";
import CommentMovie from "./CommentMovie";

const onChange = (key) => {
  // console.log(key);
};
export default function MobileDetail() {
  let { detailMovie, dataLichChieu } = useSelector(
    (state) => state.detailMovieSlice
  );

  let dispatch = useDispatch();
  let params = useParams();

  useEffect(() => {
    getDetailMovie(params.maPhim)
      .then((res) => {
        // console.log("detailMovie", res);
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
          <div className="flex flex-col justify-center items-center">
            <img
              src={htr.logo}
              alt={htr.logo}
              className="w-8 mr-3 hover:scale-110"
            />
          </div>
        ),
        children: (
          <>
            {htr.cumRapChieu?.map((cumRap, index) => {
              return (
                <div key={index} className="mb-6 border-2 p-1">
                  <div className="flex-col mb-3 w-full">
                    <img
                      className="w-full h-20 object-center mr-2"
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
                  <div>
                    {cumRap.lichChieuPhim
                      ?.slice(0, 6)
                      .map((lichChieu, index) => {
                        return (
                          <div className="flex-col">
                            <span className="block text-green-800 font-bold capitalize mb-1">
                              {moment(lichChieu.ngayChieuGioChieu).format(
                                "dddd, DD MMMM, YYYY"
                              )}
                            </span>
                            <NavLink
                              to={`/booking/${lichChieu.maLichChieu}`}
                              key={index}
                              className="block px-3 py-1 mr-2 text-center rounded font-medium bg-orange-500"
                            >
                              Đặt Vé
                            </NavLink>
                          </div>
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
  let renderDetailBottom = () => {
    return (
      <div>
        <div className="detail-bottom">
          <Tabs defaultActiveKey="tab1" centered="true">
            <Tabs.TabPane
              tab={
                <span className="text-slate-300 hover:text-orange-600 font-medium text-base">
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
                <span className="text-slate-300 hover:text-orange-600 font-medium text-base">
                  <ProfileOutlined />
                  Chi Tiết
                </span>
              }
              key={"tab2"}
            >
              <div className="p-6  text-white">
                <div className="flex flex-col">
                  <div className="border-b pb-2 mb-2">
                    <p className="text-lg ">
                      <span className="font-medium text-lg text-green-500 ">
                        Tên Phim:
                      </span>{" "}
                      {detailMovie.tenPhim}{" "}
                    </p>

                    <p className="text-lg">
                      <span className="font-medium text-lg text-green-500 ">
                        Trạng thái:
                      </span>{" "}
                      {detailMovie.dangChieu ? "Đang Chiếu" : "Sắp Chiếu"}{" "}
                    </p>
                    <p className="text-lg">
                      <span className="font-medium text-lg text-green-500 ">
                        Khởi Chiếu:
                      </span>{" "}
                      {moment(detailMovie.ngayKhoiChieu).format("MMMM Do YYYY")}{" "}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-lg text-green-500">
                      Nội Dung
                    </span>
                    <p className="text-lg">{detailMovie.moTa}</p>
                  </div>
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={
                <span className="text-slate-300 hover:text-orange-600 font-medium text-base">
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
      <div style={{ backgroundColor: "rgb(10, 32, 41)", width: "100%" }}>
        <div
          style={{
            width: "100%",
            height: "30vh",
            backgroundImage: `url(${detailMovie.hinhAnh})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
          }}
        >
          {/* <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={detailMovie.trailer}
          ></iframe> */}
        </div>
        <div className=" px-3 py-6">
          <p className="text-white text-sm font-medium">
            {moment(detailMovie.ngayKhoiChieu).format("L")}
          </p>
          <p className="text-white text-lg font-medium">
            <span className="px-1 bg-red-700 rounded">TIX</span>
            {detailMovie.tenPhim}
          </p>
          <p className="text-white text-sm font-medium">
            <span className="font-bold">
              Trạng thái: {detailMovie.dangChieu ? "Đang Chiếu" : "Sắp Chiếu"}
            </span>
          </p>
          {renderDetailBottom()}
        </div>
      </div>
    </>
  );
}
