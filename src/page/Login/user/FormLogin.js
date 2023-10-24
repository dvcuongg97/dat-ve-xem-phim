import React from "react";
import { Button, Checkbox, Form, Input, message, Divider } from "antd";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL, configHeaders } from "../../../api/configApi";
import { userLocalStorage } from "../../../api/localService";
import { NavLink, useNavigate } from "react-router-dom";

import {
  CloseCircleOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { setUserLogin } from "../../../redux/userInfoSlice";

const onFinishFailed = (errorInfo) => {
  // console.log("Failed:", errorInfo);
  message.error("Đăng Nhập Thất Bại");
};
const FormLogin = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const onFinish = (values) => {
    // console.log("Success:", values);
    axios
      .post(`${BASE_URL}/api/QuanLyNguoiDung/DangNhap`, values, {
        headers: configHeaders(),
      })
      .then((res) => {
        // console.log(res);
        dispatch(setUserLogin(res.data.content));
        userLocalStorage.set(res.data.content);
        message.success("Đăng Nhập Thành Công");
        navigate(-1);
      })
      .catch((err) => {
        // console.log(err);
        message.error("Sai Tài Khoản Mật Khẩu ");
      });
  };

  return (
    <div className="w-full lg:w-1/2">
      <NavLink
        to={"/"}
        className="fixed md:absolute md:right-[170px] md:top-[40px] top-[10px] right-[10px] text-gray-300 text-5xl hover:text-orange-500"
      >
        <CloseCircleOutlined />
      </NavLink>
      <Divider
        orientation="left"
        style={{ color: "white", border: "white" }}
        className="lg:text-xl text-[18px]"
      >
        Đăng Nhập
      </Divider>

      <div className="flex justify-center mb-12">
        <img className="w-12 lg:w-24" src="image/headTixLogo.png" />
      </div>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="w-2/3 mx-auto"
        layout="vertical"
        name="basic"
        // labelCol={{
        //   span: 8,
        // }}
        // wrapperCol={{
        //   span: 20,
        // }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <p className="text-white text-xl mb-3">Tài Khoản</p>
        <Form.Item
          // label="Tài Khoản"
          name="taiKhoan"
          rules={[
            {
              required: true,
              message: "Hãy nhập tài khoản!",
            },
          ]}
        >
          <Input placeholder="Nhập tài khoản" prefix={<UserOutlined />} />
        </Form.Item>

        <p className="text-white text-xl mb-3">Mật Khẩu</p>
        <Form.Item
          // label="Mật Khẩu"
          name="matKhau"
          rules={[
            {
              required: true,
              message: "Hãy nhập mật khẩu!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Nhập mật khẩu"
          />
        </Form.Item>
        <div className="md:flex md:justify-between text-center grid grid-cols-1 items-center md:mb-0  mb-3 ">
          <a className="text-blue-700 py-2" href="#">
            Bạn quên mật khẩu?
          </a>
          <NavLink className="capitalize text-green-500" to={"/dangky"}>
            đăng ký tài khoản mới!
          </NavLink>
        </div>
        <Form.Item
          className="flex justify-center"
          name="remember"
          valuePropName="checked"
        >
          <Checkbox className="text-white text-center">Nhớ mật khẩu?</Checkbox>
        </Form.Item>

        <Form.Item className="flex justify-center">
          <Button danger htmlType="submit">
            Đăng Nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default FormLogin;
