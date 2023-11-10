import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

import DesktopDanhSachPhim from "./DesktopDanhSachPhim";
import MobileDSP from "./MobileDSP";
import { layDanhSachPhimAction } from "../../../redux/danhSachPhimSlice";
import { useDispatch } from "react-redux";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};
// const Default = ({ children }) => {
//   const isNotMobile = useMediaQuery({ minWidth: 768 });
//   return isNotMobile ? children : null;
// };

export default function DanhSachPhim() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachPhimAction());
  }, []);
  return (
    <>
      <Desktop>
        <DesktopDanhSachPhim />
      </Desktop>
      <Tablet>
        <DesktopDanhSachPhim />
      </Tablet>
      <Mobile>
        <MobileDSP />
      </Mobile>
    </>
  );
}
