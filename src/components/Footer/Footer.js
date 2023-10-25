import React from "react";
import { Fragment } from "react";

export default function Footer() {
  let logoFooter = [
    "../image/Footer/f1.png",
    "../image/Footer/f2.png",
    "../image/Footer/f3.png",
    "../image/Footer/f4.png",
    "../image/Footer/f5.png",
    "../image/Footer/f6.png",
    "../image/Footer/f7.png",
    "../image/Footer/f8.png",
    "../image/Footer/f9.png",
    "../image/Footer/f10.png",
    "../image/Footer/f11.jpg",
    "../image/Footer/f12.png",
    "../image/Footer/f13.png",
    "../image/Footer/f14.jpg",
    "../image/Footer/f15.png",
    "../image/Footer/f16.png",
    "../image/Footer/f17.png",
    "../image/Footer/f18.jpg",
    "../image/Footer/f19.png",
    "../image/Footer/f20.png",
    "../image/Footer/f21.png",
    "../image/Footer/f22.png",
    "../image/Footer/f23.jpg",
    "../image/Footer/f24.png",
    "../image/Footer/f25.png",
  ];

  return (
    <div
      style={{
        backgroundImage: `url('../image/background/bgFooter.jpg')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <footer className="w-full p-6 pt-12 text-white">
        <div className="max-w-[940px] mx-auto">
          <div className="grid md:grid-cols-3 grid-cols-1 m-12">
            <div className="hidden md:grid grid-cols-2">
              <div className="text-sm">
                <p className="cursor-pointer font-medium">TIX</p>
                <p className="cursor-pointer">FAQ</p>
                <p className="cursor-pointer">Brand</p>
                <p className="cursor-pointer">Guidelines</p>
              </div>
              <div className="text-sm">
                <p className="cursor-pointer mb-3">Thỏa thuận sử dụng</p>
                <p className="cursor-pointer">Chính Sách Sử Dụng</p>
              </div>
            </div>

            <div className="hidden md:grid grid-cols-5 w-2/3 mx-auto">
              {logoFooter.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <img
                      className="w-6 h-6 object-center mb-2"
                      src={item}
                      alt="..."
                    />
                  </Fragment>
                );
              })}
            </div>

            <div>
              <div className="flex md:justify-around justify-between">
                <div className="flex-col">
                  <p className="text-center mb-1">MOBILE APP</p>
                  <div className="flex justify-between ">
                    <img
                      className="w-8 h-8 cursor-pointer"
                      src="../image/Footer/f1.png"
                      alt="..."
                    />
                    <img
                      className="w-8 h-8 cursor-pointer"
                      src="../image/Footer/f3.png"
                      alt="..."
                    />
                  </div>
                </div>
                <div className="md:flex-col">
                  <p className="text-center mb-1">SOCIAL APP</p>
                  <div className="flex justify-between">
                    <img
                      className="w-8 h-8 cursor-pointer"
                      src="../image/Footer/f5.png"
                      alt="..."
                    />
                    <img
                      className="w-8 h-8 cursor-pointer"
                      src="../image/Footer/f7.png"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="block md:flex border-t-2 pt-6">
            <img
              className="w-24 h-auto mx-auto mb-3 md:mb-0 md:mr-2"
              src="../image/Footer/f26.jpg"
              alt="..."
            />

            <div className="text-xs md:px-0 px-6 mb-3 md:mb-0 md:mr-2">
              <span>
                TIX - SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION Địa chỉ: Z06 Đường số
                13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ Chí Minh, Việt Nam.
              </span>
              <span>
                Giấy chứng nhận đăng ký kinh doanh số: 0101659783,đăng ký thay
                đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế hoạch và đầu
                tư Thành phố Hồ Chí Minh cấp.
              </span>
              <span>
                Số Điện Thoại (Hotline): 1900 545 436 Email: support@tix.vn
              </span>
            </div>
            <img
              className="w-36 md:m-0 mx-auto mb-3 h-auto "
              src="../image/Footer/f27.png"
              alt="..."
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
