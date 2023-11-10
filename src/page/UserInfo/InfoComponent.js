import { Button, Form, Input, message } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { clientProfileAPI } from "../../api/api";

export default function InfoComponent() {
  let { userProfile } = useSelector((state) => state.userInfoSlice);

  const onFinishFailed = (errorInfo) => {
    message.error("Cập Nhật Tài Khoản Thất Bại");
  };
  const onFinish = async (values) => {
    try {
      const res = await clientProfileAPI.capNhatThongTinNguoiDung(values);
      if (res.status === 200) {
        message.success("Cập nhật thành công");
      }
    } catch (error) {
      message.error(error.respone.data.content);
    }
  };
  let fields = [
    {
      name: ["taiKhoan"],
      value: userProfile.taiKhoan,
    },
    {
      name: ["matKhau"],
      value: userProfile.matKhau,
    },
    {
      name: ["email"],
      value: userProfile.email,
    },
    {
      name: ["soDT"],
      value: userProfile.soDT,
    },
    {
      name: ["hoTen"],
      value: userProfile.hoTen,
    },
    {
      name: ["maNhom"],
      value: userProfile.maNhom,
    },
    {
      name: ["maLoaiNguoiDung"],
      value: userProfile.loaiNguoiDung?.maLoaiNguoiDung,
    },
  ];
  return (
    <>
      <div className="col-span-4">
        <div className="flex-col p-12 justify-center">
          <div className="flex justify-center mb-6">
            <img
              className="rounded-full"
              src={`https://i.pravatar.cc/300?u=${userProfile.taiKhoan}`}
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
                <span className="text-white font-medium">Loại Người Dùng</span>
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
    </>
  );
}
