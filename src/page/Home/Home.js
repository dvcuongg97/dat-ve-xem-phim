import React from "react";
import HomeCarousel from "./Carousel/Carousel";
import DanhSachPhim from "./DanhSachPhim/Ex_DanhSachPhim";
import MainTabCumRap from "./TabCumRap/Ex_CumRap";
import TinTuc from "./TinTuc/TinTuc";
import UngDung from "./UngDung/UngDung";
export default function Home() {
  return (
    <div>
      <HomeCarousel />
      <DanhSachPhim />
      <MainTabCumRap />
      <TinTuc />
      <UngDung />
    </div>
  );
}
