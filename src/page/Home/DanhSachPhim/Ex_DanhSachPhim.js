import React from "react";
import { useMediaQuery } from "react-responsive";

import DanhSachPhimDesktop from "./DesktopDanhSachPhim";
import MobileDSPhim from "./MobileDanhSachPhim";

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
  return (
    <>
      <Desktop>
        <DanhSachPhimDesktop />
      </Desktop>
      <Tablet>
        <DanhSachPhimDesktop />
      </Tablet>
      <Mobile>
        <MobileDSPhim />
      </Mobile>
    </>
  );
}
