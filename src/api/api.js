import { https } from "./configApi";

export const getBannerMovie = () => {
  return https.get("/api/QuanLyPhim/LayDanhSachBanner");
};

export const getArrMovie = () => {
  return https.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09");
};

export let getDetailMovie = (maPhim) => {
  return https.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
};

export let getThongTinLichChieuPhim = (maPhim) => {
  return https.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
};

export let getHeThongRap = () => {
  return https.get("/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP08");
};

export let getDataPhongVeApi = (maLichChieu) => {
  return https.get(
    `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
  );
};
