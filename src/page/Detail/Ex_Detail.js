import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Detail from "./DesktopDetail";
import MobileDetail from "./MobileDetail";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  layThongTinLichChieuPhimAction,
  layThongTinPhimAction,
} from "../../redux/detailMovieSlice";

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
export default function DetailMain() {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(layThongTinPhimAction(params.maPhim));
    dispatch(layThongTinLichChieuPhimAction(params.maPhim));
  }, []);

  return (
    <>
      <Desktop>
        <Detail />
      </Desktop>
      <Tablet>
        <Detail />
      </Tablet>
      <Mobile>
        <MobileDetail />
      </Mobile>
    </>
  );
}
