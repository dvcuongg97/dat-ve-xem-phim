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
  let [tabLichChieu, setTabLichChieu] = useState(true);
  let [tabChiTiet, setTabChiTiet] = useState(false);
  let [tabBinhLuan, setTabBinhLuan] = useState(false);

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
                          <div key={index} className="flex-col mb-3">
                            <div className="w-full flex justify-between items-center">
                              <span className="block text-green-800 font-bold capitalize mb-1">
                                {moment(detailMovie.ngayKhoiChieu)
                                  .locale("vi")
                                  .format("DD MMMM, YYYY")}
                              </span>
                              <NavLink
                                to={`/booking/${lichChieu.maLichChieu}`}
                                className="block px-3 py-1 mr-2 text-center rounded font-medium bg-orange-500"
                              >
                                Đặt Vé
                              </NavLink>
                            </div>
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
          <div className="my-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-center pb-3">
              <ul
                className="flex justify-around w-full text-sm font-medium text-center"
                id="myTab"
                dataTabsToggle="#myTabContent"
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
                <div className="p-6  text-white">
                  <div className="grid grid-cols-1  gap-3">
                    <div className="grid grid-cols-12">
                      <div className="col-span-4">
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
                      <div className="col-span-8">
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
                      <span className="font-medium text-green-300 text-lg">
                        Nội Dung Phim:
                      </span>
                      <p className="text-lg text-justify">{detailMovie.moTa}</p>
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
        ></div>
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
