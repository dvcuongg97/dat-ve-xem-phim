import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import TabCumRap from "./DeskTopTabCumRap";
import MobileTabCumRap from "./MobileTabCumRap";
import { useDispatch } from "react-redux";
import { fetchHeThongRap } from "../../../redux/heThongRapSlice";

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

export default function MainTabCumRap() {
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  dispatch(fetchHeThongRap());
  return (
    <>
      <Desktop>
        <TabCumRap />
      </Desktop>
      <Tablet>
        <TabCumRap />
      </Tablet>
      <Mobile>
        <MobileTabCumRap />
      </Mobile>
    </>
  );
}
