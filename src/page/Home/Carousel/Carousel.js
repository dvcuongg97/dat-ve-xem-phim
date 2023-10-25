import React, { useRef } from "react";

import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import SearchTicket from "./SearchTicket/SearchTicket";
import "./Cargit reset --softousel.css";

export default function HomeCarousel() {
  let ref = useRef();
  let renderBanner = () => {
    const banner = [
      "../image/Banner/bn1.jpg",
      "../image/Banner/bn2.jpg",
      "../image/Banner/bn3.jpg",
      "../image/Banner/bn4.png",
    ];
    return banner.map((item, index) => {
      return (
        <div key={index} className="crs h-1/3 w-full object-fill">
          <img className="w-full h-full object-fill" src={item} alt={item} />
        </div>
      );
    });
  };
  return (
    <>
      <div className="h-0 md:h-20 "></div>
      <div className="relative">
        <SearchTicket />
        <Carousel
          // style={{
          //   maxWidth: "2000px",
          // }}
          className="crs h-3/5 w-full"
          autoplay={true}
          dots={false}
          ref={ref}
        >
          {renderBanner()}
        </Carousel>
        <button
          onClick={() => {
            ref.current.prev();
          }}
          className="hidden md:block absolute top-1/2 text-orange-500 text-5xl"
          style={{
            left: "-1%",
          }}
        >
          <LeftOutlined />
        </button>
        <button
          onClick={() => {
            ref.current.next();
          }}
          className="hidden md:block base absolute top-1/2 text-orange-500 text-5xl"
          style={{
            right: "-1%",
          }}
        >
          <RightOutlined />
        </button>
      </div>
    </>
  );
}
