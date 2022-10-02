import { baseService } from "./baseService";
import { GROUPID } from '../util/settings/config'
export class QuanLyNguoiDungService extends baseService {
    constructor() {
        super();
    }
    dangNhap = (thongTinDangNhap) => {
        return this.post(`api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
    }
    layLichSuDatVe = () => {
        return this.post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`)
    }
    layDanhSachUser = (userName) => {
        if (userName) { //! dùng thế này để xài tính năng search thì reuse nà
            return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${"GP01"}&tuKhoa=${userName}`);
        }
        return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${"GP01"}`);
    }
    deleteUser = (deleteAccount) => {
        return this.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${deleteAccount}`);
    }
    addUser = (newUser) => {
        return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, newUser);
    }
    getUserEdit = (account) => {
        return this.post(`api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${account}`);
    }
    editUser = (userEdited) => {
        return this.post(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, userEdited);
    }
}



export const quanLyNguoiDungService = new QuanLyNguoiDungService();
