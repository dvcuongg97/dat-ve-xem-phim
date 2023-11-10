import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { layThongTinTaiKhoanAction } from "../../redux/userInfoSlice";
import InfoComponent from "./InfoComponent";
import BookedList from "./BookedList";

export default function UserInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { userInfo } = useSelector((state) => state.userInfoSlice);

  useEffect(() => {
    // kiểm tra đăng nhập
    if (!userInfo) {
      navigate("/");
    }
    dispatch(layThongTinTaiKhoanAction());
  }, [userInfo]);

  return (
    <div
      style={{
        backgroundImage: "url(../image/bgall.jpg)",
      }}
      className="w-full h-100%"
    >
      <div className="hidden lg:block h-[82px] bg-white"></div>
      <div className="lg:grid lg:grid-cols-12 flex-col w-full h-full">
        <InfoComponent />
        <BookedList />
      </div>
    </div>
  );
}
