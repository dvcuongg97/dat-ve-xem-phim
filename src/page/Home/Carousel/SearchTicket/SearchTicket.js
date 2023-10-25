import React, { useEffect, useState } from "react";
import "./SearchTecket.css";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { getArrMovie } from "../../../../api/api";
import axios from "axios";
import { BASE_URL, configHeaders } from "../../../../api/configApi";

export default function SearchTicket(props) {
  let [arrPhim, setArrPhim] = useState([]);
  // let [maPhim, setMaPhim] = useState("");
  let [dataHeThongRapChieu, setDataHeThongRapChieu] = useState({});
  let [dataCumRap, setDataCumRap] = useState([]);
  let [maLichChieu, setMaLichChieu] = useState("");

  useEffect(() => {
    getArrMovie()
      .then((res) => {
        // console.log("searchTicket", res);
        setArrPhim(res.data.content);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  return (
    <div className="jss57 hidden md:block">
      <div className="flex justify-around">
        <div className="border-r-2 px-2">
          <select
            onChange={(event) => {
              axios({
                url: `${BASE_URL}/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${event.target.value}`,
                headers: configHeaders(),
                method: "GET",
              })
                .then((res) => {
                  // console.log(res);
                  setDataHeThongRapChieu(res.data.content);
                  setDataCumRap([]);
                  setMaLichChieu("");
                })
                .catch((err) => {});
            }}
            id="countries"
            className="border-none cursor-pointer  text-sm font-medium p-2.5 focus:rounded-lg"
          >
            <option>Chọn Phim</option>
            {arrPhim.map((phim, index) => {
              return (
                <option key={index} value={phim.maPhim}>
                  {phim.tenPhim}
                </option>
              );
            })}
          </select>
        </div>

        <div className="border-r-2 px-2">
          <select
            onChange={(event) => {
              setDataCumRap(
                dataHeThongRapChieu.heThongRapChieu?.map((htr) => {
                  return htr.cumRapChieu?.filter((cumRap) => {
                    return cumRap.tenCumRap === event.target.value;
                  });
                })
              );
            }}
            id="countries2"
            className="border-none cursor-pointer text-gray-900 text-sm font-medium p-2.5 focus:rounded-lg"
          >
            <option>Chọn Rạp</option>

            {dataHeThongRapChieu.heThongRapChieu?.map((htr) => {
              return htr.cumRapChieu?.map((cumRap, index) => {
                return (
                  <option key={index} value={cumRap.tenCumRap}>
                    {cumRap.tenCumRap}
                  </option>
                );
              });
            })}
          </select>
        </div>

        <div className="border-r-2 px-2">
          <select
            onChange={(event) => {
              setMaLichChieu(event.target.value);
            }}
            id="countries"
            className="border-none focus:rounded-lg cursor-pointer text-gray-900 text-sm font-medium p-2.5 "
          >
            <option>Lịch Chiếu</option>

            {dataCumRap.map((cumRap) => {
              return cumRap?.map((rap) => {
                return rap.lichChieuPhim.map((lichChieu, index) => {
                  return (
                    <option key={index} value={lichChieu.maLichChieu}>
                      {moment(lichChieu.ngayChieuGioChieu).format("L")}
                    </option>
                  );
                });
              });
            })}
          </select>
        </div>
        {maLichChieu ? (
          <button className="bg-red-500 hover:bg-red-400 block w-24 rounded-lg capitalize font-medium text-md">
            <NavLink to={`/booking/${maLichChieu}`}>đặt vé</NavLink>
          </button>
        ) : (
          <span className="bg-stone-500 block px-6 py-2 rounded-lg capitalize font-medium text-md">
            đặt vé{" "}
          </span>
        )}
      </div>
    </div>
  );
}
