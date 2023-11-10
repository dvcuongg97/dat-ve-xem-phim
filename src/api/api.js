import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";
import { https } from "./configApi";

export const clientAPI = {
  layDanhSachBanner: () => {
    return https.get("/api/QuanLyPhim/LayDanhSachBanner");
  },

  layDanhSachPhim: () => {
    return https.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09");
  },

  layThongTinPhim: (maPhim) => {
    return https.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
  },

  layThongTinLichChieuPhim: (maPhim) => {
    return https.get(
      `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
    );
  },

  layThongTinLichChieuHeThongRap: () => {
    return https.get(
      "/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP08"
    );
  },

  layDanhSachPhongVe: (maLichChieu) => {
    return https.get(
      `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
  },
};

export const clientProfileAPI = {
  thongTinTaiKhoan: () => {
    return https.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan");
  },
  capNhatThongTinNguoiDung: (values) => {
    return https.put("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", values);
  },
  datVe: (thongTinDatVe = new ThongTinDatVe()) => {
    return https.post(`/api/QuanLyDatVe/DatVe/`, thongTinDatVe);
  },
};
