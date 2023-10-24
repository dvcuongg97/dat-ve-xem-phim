import React, { Fragment, useEffect, useState } from "react";
import { getHeThongRap } from "../../../api/api";
import { Popover, Collapse, Tabs } from "antd";
import moment from "moment/moment";
import { NavLink } from "react-router-dom";
import "../../../../node_modules/moment/locale/vi";
const onChange = (key) => {
  // console.log(key);
};
export default function MobileTabCumRap(props) {
  let [arrHeThongRap, setArrHeThongRap] = useState([]);
  useEffect(() => {
    getHeThongRap()
      .then((res) => {
        // console.log(res);
        setArrHeThongRap(res.data.content);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  const renderLichChieu = (danhSachPhim) => {
    return danhSachPhim?.map((phim, index) => {
      return (
        <div key={index}>
          <div className="flex flex-col p-3 border-b">
            <img
              className="w-3/4 h-28 object-cover mb-1"
              src={phim.hinhAnh}
              alt="..."
            />
            <div className="flex items-center mb-2">
              <span className="text-black text-base font-medium mr-2">
                {phim.tenPhim}
              </span>
              <span className="text-sm text-left">
                {phim.dangChieu ? "Đang Chiếu" : "Sắp Chiếu"}
              </span>
            </div>
            <div>
              {phim.lstLichChieuTheoPhim
                .slice(0, 10)
                .map((lichChieu, index) => {
                  return (
                    <div key={index} className="mb-1 flex items-center ">
                      <NavLink
                        style={{
                          backgroundColor: "rgb(251, 66, 38)",
                        }}
                        className=" text-white py-1 px-3 mr-2 border rounded-md  font-medium capitalize"
                        to={`/booking/${lichChieu.maLichChieu}`}
                      >
                        Đặt Vé
                      </NavLink>
                      <p className="text-base text-gray-700 capitalize font-medium mb-1">
                        {moment(lichChieu.ngayChieuGioChieu)
                          .locale("vi")
                          .format("dddd, DD MMMM, YYYY")}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      );
    });
  };

  const renderTabCumRap = () => {
    return arrHeThongRap.map((htr, index) => {
      return {
        key: { index },
        label: <img className="w-12 h-12" src={htr.logo} alt=".." />,
        children: (
          <Collapse
            items={htr.lstCumRap.slice(0, 6).map((cumRap) => {
              return {
                key: cumRap.maCumRap,
                label: (
                  <div className="flex">
                    <img
                      className="w-12 h-12 mr-2"
                      src={cumRap.hinhAnh}
                      alt={cumRap.hinhAnh}
                    />

                    <div className="text-left">
                      <Popover
                        content={
                          <div>
                            <p>{cumRap.diaChi}</p>
                          </div>
                        }
                      >
                        <p className=" text-green-500 font-bold">
                          {cumRap.tenCumRap}
                        </p>

                        <p className="text-ellipsis overflow-hidden text-black">
                          {cumRap.diaChi.slice(0, 20)} ...
                        </p>
                      </Popover>
                    </div>
                  </div>
                ),
                children: <>{renderLichChieu(cumRap.danhSachPhim)}</>,
              };
            })}
          />
        ),
      };
    });
  };
  return (
    <div className="mt-9 mb-6 w-full">
      <Tabs
        itemActiveColor="white"
        className="px-3 "
        centered={true}
        onChange={onChange}
        items={renderTabCumRap()}
      />
    </div>
  );
}
