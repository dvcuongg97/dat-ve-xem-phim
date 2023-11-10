import React from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import moment from "moment";

export default function BookedList() {
  let { userProfile } = useSelector((state) => state.userInfoSlice);
  let { thongTinDatVe } = userProfile;

  return (
    <>
      <div className="lg:col-span-8 lg:p-6 border-gray-500">
        <p className="text-green-500 shadow-md shadow-white text-center font-bold text-3xl uppercase border-b-2 mb-6">
          danh sách phim đã đặt
        </p>
        <div className="lg:grid lg:grid-cols-2 gap-3 mx-6 p-6 lg:h-[940px] lg:overflow-y-scroll tabCumRap flex-col">
          {thongTinDatVe ? (
            thongTinDatVe?.map((ticket, index) => {
              const seats = _.first(ticket.danhSachGhe);
              return (
                <div
                  key={index}
                  className="h-full grid-cols-1 md:flex items-center border-gray-200 border mt-3 p-3 rounded-lg "
                >
                  <div className="w-full md:w-1/2 mr-3">
                    <img
                      alt="..."
                      className="w-full md:h-auto h-1/2 bg-gray-100 object-cover object-center flex-shrink-0"
                      src={ticket.hinhAnh}
                    />
                  </div>
                  <div className="md:flex-grow md:w-1/2 flex-col">
                    <h2 className="text-pink-500 title-font font-medium text-2xl">
                      {ticket.tenPhim}
                    </h2>
                    <div className="text-gray-200">
                      <p>
                        <span className="font-bold">Giờ chiếu:</span>{" "}
                        {moment(ticket.ngayDat).format("hh:mm A")} -{" "}
                      </p>
                      <p>
                        <span className="font-bold">Ngày chiếu:</span>{" "}
                        {moment(ticket.ngayDat).format("DD-MM-YYYY")} .
                      </p>
                    </div>
                    <p className="text-gray-200">
                      <span className="font-bold">Địa điểm:</span>{" "}
                      {seats.tenHeThongRap}{" "}
                    </p>
                    <p className="text-gray-200 mb-2">
                      <span className="font-bold">Tên rạp:</span>{" "}
                      {seats.tenCumRap}
                    </p>
                    <div className="flex flex-wrap items-center">
                      <span className="font-bold text-gray-200 mr-2">Ghế:</span>{" "}
                      {ticket.danhSachGhe.map((ghe, index) => {
                        return (
                          <span
                            className="bg-green-500 px-0.5 text-xl font-medium rounded-md mb-1 mr-2"
                            key={index}
                          >
                            {" "}
                            {ghe.tenGhe}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-2">
              <div className="flex justify-center items-center">
                <span className="inline-block text-4xl mt-36 font-medium text-red-500 uppercase">
                  bạn chưa đặt vé
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
