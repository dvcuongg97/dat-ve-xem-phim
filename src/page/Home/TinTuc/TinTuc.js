import { Tabs } from "antd";
import React from "react";

export default function TinTuc() {
  const renderBottomNews = () => {
    return (
      <div className="md:grid md:grid-cols-3 flex-col ">
        <div className="col-span-2">
          <div className="flex justify-center mb-6">
            <div className="flex flex-col w-[50%] items-center p-3">
              <div className="w-full mb-4 ">
                <img className="rounded-md" src="./image/news/useall1.png" />
              </div>
              <div className="flex flex-col ">
                <p className="text-black text-lg font-bold leading-tight mb-2">
                  Ấn định chắc nịch ngày khởi chiếu 16.04, Lý Hải tung clip Lật
                  Mặt: 48H đậm chất
                </p>
                <p className="text-gray-500">
                  Trước thềm khởi chiếu 16.04 này, Lý Hải bất ngờ tung clip rượt
                  đuổi gay cấn thót tim fans hâm mộ
                </p>
              </div>
            </div>
            <div className="flex flex-col w-[50%] items-center p-3">
              <div className="w-full mb-4">
                <img className="rounded-md" src="./image/news/useall2.png" />
              </div>
              <div className="flex flex-col ">
                <p className="text-black text-lg font-bold leading-tight mb-2 capitalize">
                  [Mortal Kombat: Cuộc Chiến Sinh Tử] - gọi tên những phim điện
                  ảnh nổi...
                </p>
                <p className="text-gray-500">
                  Cư dân nơi khác đang sắp “gato nổ mắt” với dân Sài Thành khi
                  sắp tới đây thành phố HCM...
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 p-3">
          <div className="flex justify-center mb-1">
            <img
              className="w-24 h-24 mr-1 rounded-md"
              src="./image/news/qc1.jpg"
            />
            <p className="text-gray-500 font-medium text-base leading-tight">
              Khai trương rạp xịn giá ngon, chuẩn xì-tai Sài Gòn
            </p>
          </div>
          <div className="flex justify-center mb-1">
            <img
              className="w-24 h-24 mr-1 rounded-md"
              src="./image/news/qc2.png"
            />
            <p className="text-gray-500 font-medium text-base leading-tight">
              “Bóc tem” tổ hợp giải trí mới toanh của giới Hà Thành
            </p>
          </div>
          <div className="flex justify-center mb-1">
            <img
              className="w-24 h-24 mr-1 rounded-md"
              src="./image/news/qc3.jpg"
            />
            <p className="text-gray-500 font-medium text-base leading-tight">
              Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần công
            </p>
          </div>
          <div className="flex justify-center mb-1">
            <img
              className="w-24 h-24 mr-1 rounded-md"
              src="./image/news/qc4.png"
            />
            <p className="text-gray-500 font-medium text-base leading-tight">
              NGÔ THANH VÂN CHÍNH THỨC KHỞI ĐỘNG CUỘC THI THIẾT
            </p>
          </div>
        </div>
      </div>
    );
  };

  const item = [
    {
      key: "1",
      label: (
        <span className="text-gray-500 font-medium uppercase">
          điện ảnh 24h
        </span>
      ),
      children: (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 mb-6 gap-6 p-3">
            <div>
              <div className="mb-4 ">
                <img className="rounded-md" src="./image/news/latmatnews.png" />
              </div>
              <div className="flex flex-col ">
                <p className="text-black text-lg font-bold leading-tight mb-2">
                  Ấn định chắc nịch ngày khởi chiếu 16.04, Lý Hải tung clip Lật
                  Mặt: 48H đậm chất
                </p>
                <p className="text-gray-500">
                  Trước thềm khởi chiếu 16.04 này, Lý Hải bất ngờ tung clip rượt
                  đuổi gay cấn thót tim fans hâm mộ
                </p>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <img className="rounded-md" src="./image/news/mortalnews.png" />
              </div>
              <div className="flex flex-col ">
                <p className="text-black text-lg font-bold leading-tight mb-2 capitalize">
                  [Mortal Kombat: Cuộc Chiến Sinh Tử] - gọi tên những phim điện
                  ảnh nổi...
                </p>
                <p className="text-gray-500">
                  Cư dân nơi khác đang sắp “gato nổ mắt” với dân Sài Thành khi
                  sắp tới đây thành phố HCM sẽ chào đón một rạp chiếu phim mang
                  phong cách Artistic Urban Lifestyle đầu tiên tại Việt Nam!
                </p>
              </div>
            </div>
          </div>
          {renderBottomNews()}
        </>
      ),
    },
    {
      key: "2",
      label: (
        <span className="text-gray-500 font-medium uppercase">tin tức</span>
      ),
      children: (
        <>
          <div className=" grid grid-cols-1 md:grid-cols-2 mb-6 gap-6 p-3">
            <div>
              <div className="mb-4">
                <img className="rounded-md" src="./image/news/tintuc1.png" />
              </div>
              <div className="flex flex-col ">
                <p className="text-black text-lg font-bold leading-tight mb-2">
                  Ấn định chắc nịch ngày khởi chiếu 16.04, Lý Hải tung clip Lật
                  Mặt: 48H đậm chất
                </p>
                <p className="text-gray-500">
                  Trước thềm khởi chiếu 16.04 này, Lý Hải bất ngờ tung clip rượt
                  đuổi gay cấn thót tim fans hâm mộ
                </p>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <img className="rounded-md" src="./image/news/tintuc2.png" />
              </div>
              <div className="flex flex-col ">
                <p className="text-black text-lg font-bold leading-tight mb-2">
                  Review: Dinh Thự Oan Khuất (Ghost Of War)
                </p>
                <p className="text-gray-500">
                  Tuy là một bộ phim có chất lượng tốt, nhưng có vẻ Dinh Thự Oan
                  Khuất vẫn chưa đủ để đem khán giả trở lại phòng vé!
                </p>
              </div>
            </div>
          </div>
          {renderBottomNews()}
        </>
      ),
    },
    {
      key: "3",
      label: (
        <span className="text-gray-500 font-medium uppercase">khuyến mãi</span>
      ),
      children: (
        <>
          <div className=" grid grid-cols-1 md:grid-cols-2 mb-6 gap-6 p-3">
            <div>
              <div className="mb-4">
                <img className="rounded-md" src="./image/news/khuyenmai1.jpg" />
              </div>
              <div className="flex flex-col">
                <p className="text-black text-lg font-bold leading-tight mb-2">
                  TIX 1K/VÉ NGẠI CHI GIÁ VÉ
                </p>
                <p className="text-gray-500">
                  Đồng giá 1k/vé cả tuần tất cả các rạp trên TIX + Nhận thêm 02
                  voucher thanh toán ZaloPay thả ga
                </p>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <img className="rounded-md" src="./image/news/khuyenmai2.jpg" />
              </div>
              <div className="flex flex-col ">
                <p className="text-black text-lg font-bold leading-tight mb-2">
                  BHD 59K/VÉ CẢ TUẦN !!!
                </p>
                <p className="text-gray-500">
                  Tận hưởng Ưu Đãi lên đến 3 VÉ BHD Star mỗi tuần chỉ với giá
                  59k/vé khi mua vé trên TIX hoặc Mục Vé Phim trên ZaloPay.
                </p>
              </div>
            </div>
          </div>
          {renderBottomNews()}
        </>
      ),
    },
  ];

  return (
    <>
      <div className="max-w-[940px] w-full mx-auto ">
        <div
          className="hidden md:block"
          style={{
            backgroundImage: "url(./image/shadow.png)",
            backgroundSize: "100%",
            maxWidth: "768x",
            width: "100%",
            height: "120px",
            margin: "auto",
          }}
        ></div>
        <Tabs
          id="tinTuc"
          className="cursor-pointer mb-6"
          centered={true}
          items={item}
        />
      </div>
    </>
  );
}
