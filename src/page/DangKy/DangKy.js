import React from "react";
import { Form, Input, Button, Divider, message } from "antd";
import axios from "axios";
import { BASE_URL, configHeaders } from "../../api/configApi";
import { NavLink, useNavigate } from "react-router-dom";
import { CloseCircleOutlined } from "@ant-design/icons";

const onFinishFailed = (errorInfo) => {
  // console.log("Failed:", errorInfo);
  message.error("Đăng Nhập Thất Bại");
};

export default function DangKy() {
  //
  let navigate = useNavigate();
  const onFinish = (values) => {
    // console.log("Success:", values);
    axios
      .post(`${BASE_URL}/api/QuanLyNguoiDung/DangKy`, values, {
        headers: configHeaders(),
      })
      .then((res) => {
        // console.log(res);
        message.success("Đăng Ký Thành Công");
        navigate("/");
      })
      .catch((err) => {
        // console.log(err);
        message.error("Tài Khoản Đăng Ký Không Hợp Lệ");
      });
  };

  return (
    <div
      style={{
        backgroundImage: "url(../image/bgall.jpg)",
      }}
      className="h-screen w-full flex items-center justify-center"
    >
      <div className="bgdkpage relative max-h-[600px] h-full max-w-[600px] w-full rounded-xl ">
        <NavLink
          to={"/"}
          className="md:absolute fixed top-[10px] right-[10px] md:top-[-20px] md:right-[-20px]  text-gray-300 text-5xl hover:text-orange-500"
        >
          <CloseCircleOutlined />
        </NavLink>
        <Divider
          orientation="left"
          style={{ fontSize: "18px", color: "white", border: "white" }}
        >
          Đăng Ký
        </Divider>
        <div className="flex justify-center mb-3">
          <img
            className="md:h-auto w-12"
            src="image/headTixLogo.png"
            alt="..."
          />
        </div>
        <Form
          name="dangKy"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
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
              name="soDt"
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
              <Input className="rounded-md" placeholder="Số điện thoại..." />
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
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                className="text-white font-medium "
                block
                htmlType="submit"
              >
                Đăng Ký
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}
