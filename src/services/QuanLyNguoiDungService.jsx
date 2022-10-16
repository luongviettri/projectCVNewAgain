import { baseService } from "./baseService";
export class QuanLyNguoiDungService extends baseService {
  // constructor() {
  //     super();
  // }
  dangNhap = (thongTinDangNhap) => {
    return this.post(`api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
  };
  dangKy = (thongTinDangKy) => {
    return this.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
  };
  layLichSuDatVe = () => {
    return this.post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`);
  };
  layDanhSachUser = (userName) => {
    if (userName) {
      //! dùng thế này để xài tính năng search thì reuse nà
      return this.get(
        `api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${"GP00"}&tuKhoa=${userName}`
      );
    }
    return this.get(
      `api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${"GP00"}`
    );
  };
  deleteUser = (deleteAccount) => {
    return this.delete(
      `api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${deleteAccount}`
    );
  };
  addUser = (newUser) => {
    return this.post(`api/QuanLyNguoiDung/ThemNguoiDung`, newUser);
  };
  getUserEdit = (account) => {
    return this.post(
      `api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${account}`
    );
  };
  editUser = (userEdited) => {
    return this.put(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, userEdited);
  };
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
