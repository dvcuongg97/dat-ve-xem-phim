import React, { useRef } from "react";

import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import SearchTicket from "./SearchTicket/SearchTicket";

export default function HomeCarousel() {
  let ref = useRef();
  let bannerRef = useRef([
    "../image/Banner/bn1.jpg",
    "../image/Banner/bn2.jpg",
    "../image/Banner/bn3.jpg",
    "../image/Banner/bn4.png",
  ]);
  const renderBanner = () => {
    return bannerRef?.current?.map((item, index) => {
      return (
        <div key={index} className="md:h-[760px] h-1/3 w-full object-fill">
          <img className="w-full h-full object-fill" src={item} alt={item} />
        </div>
      );
    });
  };
  return (
    <>
      <div className="h-0 md:h-[82px] bg-white"></div>
      <div className="relative">
        <SearchTicket />
        <Carousel
          className="md:h-[760px] h-3/5 w-full max-w-[2000px]"
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
          className="hidden md:block absolute top-1/2 left-[1%] text-orange-500 text-5xl"
        >
          <LeftOutlined />
        </button>
        <button
          onClick={() => {
            ref.current.next();
          }}
          className="hidden md:block base absolute top-1/2 right-[1%] text-orange-500 text-5xl"
        >
          <RightOutlined />
        </button>
      </div>
    </>
  );
}
