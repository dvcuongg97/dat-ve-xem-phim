import { Carousel } from "antd";
import React from "react";

export default function UngDung() {
  const hinhAnh = [
    "./image/UngDung/CarouselUngDung/crs1.jpg",
    "./image/UngDung/CarouselUngDung/crs2.jpg",
    "./image/UngDung/CarouselUngDung/crs3.jpg",
    "./image/UngDung/CarouselUngDung/crs4.jpg",
    "./image/UngDung/CarouselUngDung/crs5.jpg",
    "./image/UngDung/CarouselUngDung/crs6.jpg",
  ];

  return (
    <div
      style={{
        color: "white",
        width: "100%",
        padding: "60px",
        height: "content-fit",
        backgroundImage: "url(../image/bgall.jpg)",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      id="ungDung"
    >
      <div className="max-w-[940px] w-full mx-auto">
        <div className=" grid md:grid-cols-2 grid-cols-1 gap-20">
          <div className="flex items-center h-full">
            <div>
              <p className="text-3xl font-bold">Ứng dụng tiện lợi</p>
              <p className="text-3xl font-bold">dành cho người yêu điện ảnh</p>
              <br />
              <p>
                Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp
                và đổi quà hấp dẫn.
              </p>
              <br />

              <button className="px-6 py-5 bg-red-500 hover:bg-red-700 transition-all duration-300 rounded font-medium uppercase">
                App miễn phí - Tải về ngay!
              </button>
              <br />
              <br />
              <p>
                Tix có hai phiên bản{" "}
                <a
                  href="https://itunes.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197?mt=8"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline" }}
                >
                  IOS
                </a>{" "}
                và{" "}
                <a
                  href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline" }}
                >
                  Android
                </a>
              </p>
            </div>
          </div>
          <div>
            <div className="relative">
              <img
                // className="absolute top-0 left-0"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  padding: "0 28%",
                }}
                src="./image/UngDung/borderphonebg.png"
                alt="..."
              />
              <div
                style={{
                  top: 0,
                  left: 0,
                  width: "100%",
                  display: " block",
                  padding: "1.5% 29.2% 0 29.2%",
                  position: "absolute",
                  borderRadius: "20px",
                }}
              >
                <Carousel
                  className="jss123"
                  // effect={"fade"}
                  autoplay={true}
                  dots={false}
                >
                  {hinhAnh.map((item, index) => (
                    <div key={index}>
                      <img src={item} alt="..." />
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
