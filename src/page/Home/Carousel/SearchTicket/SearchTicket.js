import React, { useEffect, useState } from "react";
import "./SearchTecket.css";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { clientAPI } from "../../../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachPhimAction } from "../../../../redux/danhSachPhimSlice";

export default function SearchTicket(props) {
  const dispatch = useDispatch();
  const { danhSachPhim } = useSelector((state) => state.danhSachPhimSlice);

  let [dataHeThongRapChieu, setDataHeThongRapChieu] = useState({});
  let [dataCumRap, setDataCumRap] = useState([]);
  let [maLichChieu, setMaLichChieu] = useState("");

  useEffect(() => {
    dispatch(layDanhSachPhimAction());
  }, []);

  const handleOnchange = async (maPhim) => {
    try {
      const res = await clientAPI.layThongTinLichChieuPhim(maPhim);
      if (res.status === 200) {
        setDataHeThongRapChieu(res.data.content);
      }
      setDataCumRap([]);
      setMaLichChieu("");
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className="jss57 hidden lg:block">
      <div className="flex justify-around">
        <div className="border-r-2 px-2">
          <select
            onChange={(event) => {
              handleOnchange(event.target.value);
            }}
            id="countries"
            className="border-none cursor-pointer  text-sm font-medium p-2.5 focus:rounded-lg"
          >
            <option>Chọn Phim</option>
            {danhSachPhim?.map((phim, index) => {
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
                dataHeThongRapChieu?.heThongRapChieu?.map((htr) => {
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

            {dataHeThongRapChieu?.heThongRapChieu?.map((htr) => {
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

            {dataCumRap?.map((cumRap) => {
              return cumRap?.map((rap) => {
                return rap.lichChieuPhim?.map((lichChieu, index) => {
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
