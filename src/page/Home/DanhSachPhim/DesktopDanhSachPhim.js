import React from "react";
import "./StyleCardPhim.css";
import "./RatingStyle.css";
import "./TextStyle.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "../../../../node_modules/swiper/swiper.css";
import "../../../../node_modules/swiper/modules/grid.css";
import "../../../../node_modules/swiper/modules/pagination.css";

// import required modules
import { Grid, Pagination } from "swiper/modules";

import "../../../../node_modules/react-modal-video/css/modal-video.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenVideoModal,
  setUrlTrailer,
} from "../../../redux/videoModalSlice";
import VideoModal from "../../../components/VideoModal/VideoModal";

export default function DesktopDanhSachPhim() {
  const dispatch = useDispatch();
  const { danhSachPhim } = useSelector((state) => state.danhSachPhimSlice);

  const handleTrailer = (phim) => {
    dispatch(setOpenVideoModal(true));
    dispatch(setUrlTrailer(phim));
  };
  const renderCardPhim = () => {
    return danhSachPhim?.map((phim, index) => {
      return (
        <SwiperSlide key={index}>
          {/* <div className="w-full flex justify-center font-medium text-green-500 mb-24"></div> */}
          <div className="card-phim">
            <div className="img-hover-tut">
              <img src={phim.hinhAnh} alt={phim.hinhAnh} />
              <div>
                <i datastar={phim.danhGia / 2}></i>
              </div>
              <div className="img-overlay">
                <div
                  onClick={() => {
                    handleTrailer(phim);
                  }}
                  className="button-play"
                >
                  <img src="../image/play-video1.png" alt="..." />
                </div>
              </div>
            </div>
            <div className="phim-content">
              <div className="div-ten-phim">
                <span className="span-c18">TIX</span>
                {phim.tenPhim}
              </div>
              <div className="button-chitiet">
                <NavLink to={`movie/${phim.maPhim}`}>Mua Vé</NavLink>
              </div>
            </div>
          </div>
        </SwiperSlide>
      );
    });
  };

  return (
    <>
      <div id="lichChieu" className="container mx-auto md:mt-12 lg:mt-24">
        <p className="uppercase text-xl font-bold text-gray-500 text-center">
          danh sách phim
        </p>
        <Swiper
          slidesPerView={5}
          grid={{
            rows: 2,
          }}
          // spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Grid, Pagination]}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            400: {
              slidesPerView: 2,
            },
            639: {
              slidesPerView: 3,
            },
            865: {
              slidesPerView: 5,
            },
            // 1000: {
            //   slidesPerView: 5,
            // },
            // 1500: {
            //   slidesPerView: 6,
            // },
            // 1700: {
            //   slidesPerView: 7,
            // },
          }}
        >
          {renderCardPhim()}
        </Swiper>
        <VideoModal />
      </div>
    </>
  );
}
