import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, TOKEN_CYBERSOFT } from "../../api/configApi";
import { userLocalStorage } from "../../api/localService";
import moment from "moment";
import _ from "lodash";
import { setLoadingOn, setLoadingOff } from "../../redux/spinnerSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";

export default function UserInfo() {
  // kiểm tra đăng nhập
  let { userInfo } = useSelector((state) => state.userInfoSlice);
  let navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  let dispatch = useDispatch();
  let [dataTaiKhoan, setDataTaiKhoan] = useState({});
  let { thongTinDatVe } = dataTaiKhoan;

  useEffect(() => {
    dispatch(setLoadingOn());
    axios
      .post(
        `${BASE_URL}/api/QuanLyNguoiDung/ThongTinTaiKhoan`,
        (thongTinDatVe = new ThongTinDatVe()),
        {
          headers: {
            TokenCybersoft: TOKEN_CYBERSOFT,
            Authorization: "Bearer " + userLocalStorage.get()?.accessToken,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setDataTaiKhoan(res.data.content);
        dispatch(setLoadingOff());
      })
      .catch((err) => {
        dispatch(setLoadingOn());

        // console.log(err);
      });
  }, []);

  // antd handle start
  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
    message.error("Cập Nhật Tài Khoản Thất Bại");
  };
  const onFinish = (values) => {
    axios
      .put(`${BASE_URL}/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, values, {
        headers: {
          TokenCybersoft: TOKEN_CYBERSOFT,
          Authorization: "Bearer " + userLocalStorage.get()?.accessToken,
        },
      })
      .then((res) => {
        // console.log(res);
        message.success("Cập Nhật Thành Công");
      })
      .catch((err) => {
        // console.log(err);
        message.error("Cập Nhật Thất Bại");
      });
  };
  let fields = [
    {
      name: ["taiKhoan"],
      value: dataTaiKhoan.taiKhoan,
    },
    {
      name: ["matKhau"],
      value: dataTaiKhoan.matKhau,
    },
    {
      name: ["email"],
      value: dataTaiKhoan.email,
    },
    {
      name: ["soDT"],
      value: dataTaiKhoan.soDT,
    },
    {
      name: ["hoTen"],
      value: dataTaiKhoan.hoTen,
    },
    {
      name: ["maNhom"],
      value: dataTaiKhoan.maNhom,
    },
    {
      name: ["maLoaiNguoiDung"],
      value: dataTaiKhoan.loaiNguoiDung?.maLoaiNguoiDung,
    },
  ];
  //

  return (
    <div
      style={{
        backgroundImage: "url(../image/bgall.jpg)",
      }}
      className="w-full h-100%"
    >
      <div className="hidden lg:block h-[82px] bg-white"></div>
      <div className="lg:grid lg:grid-cols-12 flex-col w-full h-full">
        <div className="col-span-4">
          <div className="flex-col p-12 justify-center">
            <div className="flex justify-center mb-6">
              <img
                className="rounded-full"
                src={`https://i.pravatar.cc/300?u=${dataTaiKhoan.taiKhoan}`}
                alt="..."
              />
            </div>
            <div>
              <Form
                name="capNhat"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                fields={fields}
              >
                <div className="w-[70%] mx-auto">
                  <span className="text-white font-medium">Tài Khoản</span>
                  <Form.Item
                    name="taiKhoan"
                    rules={[
                      { required: true, message: "Hãy nhập tài khoản" },
                      { min: 3, message: "Tài khoản chứa ít nhất 3 kí tự" },
                    ]}
                  >
                    <Input className="rounded-md" placeholder="Tài Khoản..." />
                  </Form.Item>
                </div>
                <div className="w-[70%] mx-auto">
                  <span className="text-white font-medium">Mật Khẩu</span>
                  <Form.Item
                    name="matKhau"
                    rules={[
                      { required: true, message: "Hãy nhập mật khẩu" },
                      { min: 6, message: "Tài khoản chứa ít nhất 6 kí tự" },
                    ]}
                  >
                    <Input.Password
                      className="rounded-md"
                      placeholder="Mật Khẩu..."
                    />
                  </Form.Item>
                </div>
                <div className="w-[70%] mx-auto">
                  <span className="text-white font-medium">E-mail</span>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "E-mail không hợp lệ",
                      },
                      {
                        required: true,
                        message: "Hãy nhập E-mail của bạn!",
                      },
                    ]}
                  >
                    <Input className="rounded-md" placeholder="Email..." />
                  </Form.Item>
                </div>

                <div className="w-[70%] mx-auto">
                  <span className="text-white font-medium">Số Điện Thoại</span>
                  <Form.Item
                    name="soDT"
                    rules={[
                      {
                        required: true,
                        message: "Số điện thoại không hợp lệ",
                        pattern: new RegExp(/^[0-9]+$/),
                      },
                      {
                        min: 9,
                        message: "Chứa ít nhất chín chữ số",
                      },
                    ]}
                  >
                    <Input
                      className="rounded-md"
                      placeholder="Số điện thoại..."
                    />
                  </Form.Item>
                </div>
                <div className="w-[70%] mx-auto">
                  <span className="text-white font-medium">Họ và Tên</span>
                  <Form.Item
                    name="hoTen"
                    rules={[
                      { required: true, message: "Hãy nhập Họ Tên" },
                      { min: 2, message: "Tài khoản chứa ít nhất 2 kí tự" },
                    ]}
                  >
                    <Input className="rounded-md" placeholder="Họ và Tên..." />
                  </Form.Item>
                </div>
                <div className="w-[70%] mx-auto">
                  <span className="text-white font-medium">Mã Nhóm</span>
                  <Form.Item
                    name="maNhom"
                    rules={[
                      { required: true, message: "Hãy nhập Mã Nhóm" },
                      { min: 2, message: "Tài khoản chứa ít nhất 2 kí tự" },
                    ]}
                  >
                    <Input className="rounded-md" placeholder="Mã Nhóm..." />
                  </Form.Item>
                </div>
                <div className="w-[70%] mx-auto">
                  <span className="text-white font-medium">
                    Loại Người Dùng
                  </span>
                  <Form.Item
                    name="maLoaiNguoiDung"
                    rules={[
                      { required: true, message: "Hãy nhập Mã Nhóm" },
                      { min: 2, message: "Tài khoản chứa ít nhất 2 kí tự" },
                    ]}
                  >
                    <Input
                      className="rounded-md"
                      placeholder="Loại Người Dùng..."
                    />
                  </Form.Item>
                </div>
                <div className="w-[70%] mx-auto">
                  <Form.Item wrapperCol={{ span: 24 }}>
                    <Button
                      className="text-white font-medium "
                      block
                      htmlType="submit"
                    >
                      Cập Nhật
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
        </div>
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
                        <span className="font-bold text-gray-200 mr-2">
                          Ghế:
                        </span>{" "}
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
      </div>
    </div>
  );
}
