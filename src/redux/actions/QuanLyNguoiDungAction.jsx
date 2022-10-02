import axios from 'axios'
import { DOMAIN } from '../../util/settings/config';
import { SET_CAROUSEL } from './types/CarouselType';
import { quanLyPhimService } from '../../services/QuanLyPhimService';
import { SET_DANH_SACH_PHIM } from './types/QuanLyPhimTypes';
import { quanLyNguoiDungService } from '../../services/QuanLyNguoiDungService';
import { DANG_NHAP_ACTION, EDIT_USER, GET_USER_LIST } from './types/QuanLyNguoiDungTypes';
import { message } from 'antd';
import { history } from '../../App';

export const dangNhapAction = (user) => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyNguoiDungService.dangNhap(user);
            if (status == 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: data.content,
                })
                message.success("Bạn đăng nhập thành công rồi nà", 1);
                //! chuyển hướng về trang trước đó
                setTimeout(() => {
                    history.goBack();
                }, 1000)
            } else {
                // message("error", "hất bại rồi nà");
                console.log("có lỗi gì goy");
            }

        } catch (err) {
            console.log('err: ', err);
        }
    };
}

export const layThongTinNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            console.log("Vo day");
            const { data, status } = await quanLyNguoiDungService.layLichSuDatVe();
            console.log('data: >>>', data);
            if (status == 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinNguoiDung: data.content,
                })
            } else {
                console.log("có lỗi gì goy");
            }

        } catch (err) {
            console.log('err: ', err);
        }
    };
}
export const layDanhSachUserAction = (tenPhim) => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyNguoiDungService.layDanhSachUser(tenPhim);
            if (status == 200) {
                dispatch({
                    type: GET_USER_LIST,
                    userList: data.content,
                })
            } else {
                console.log("có lỗi gì goy");
            }

        } catch (err) {
            console.log('err: ', err);
        }
    };
}
export const deleteUserAction = (deleteAccount) => {
    console.log('deleteAccount:>>> ', deleteAccount);
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyNguoiDungService.deleteUser(deleteAccount);
            if (status == 200) {
                message.success("Xóa thành công tài khoản " + deleteAccount + " rồi nà")
                dispatch(layDanhSachUserAction())
            } else {
                message.error("có lỗi gì goy");
            }

        } catch (error) {
            message.error("có lỗi gì goy");
            console.log('error: ', error);
        }
    };
}
export const addUserAction = (newUser) => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyNguoiDungService.addUser(newUser);
            if (status == 200) {
                message.success(`Bạn đã thêm user ${newUser.taiKhoan} thành công`);
                dispatch(layDanhSachUserAction());
                return true;
            } else {
                message.error("có lỗi gì goy");
                return false;
            }


        } catch (error) {
            message.error("có lỗi gì goy");
            return false;
            console.log('error: ', error);
        }
    };
}
export const getUserEditAction = (account) => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyNguoiDungService.getUserEdit(account);
            if (status == 200) {
                // message.success(`Bạn đã thêm user ${newUser.taiKhoan} thành công`);
                // dispatch(layDanhSachUserAction());
                // return true;
                dispatch({
                    type: EDIT_USER,
                    userEdit: data.content
                })
            } else {
                // message.error("có lỗi gì goy");
                // return false;
            }
        } catch (error) {
            message.error("có lỗi gì goy");
            return false;
            console.log('error: ', error);
        }
    };
}
export const editUserAction = (userEdited) => {
    // console.log('userEdited: ', userEdited);
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyNguoiDungService.editUser(userEdited);
            console.log('status: ', status);
            console.log('data: ', data);
            if (status == 200) {
                message.success(`Bạn đã sửa user ${userEdited.taiKhoan} thành công`);
                // dispatch(layDanhSachUserAction());
                return true;
                // dispatch({
                //     type: EDIT_USER,
                //     userEdit: data.content
                // })
            } else {
                message.error("có lỗi gì goy");
                return false;
            }
        } catch (error) {
            message.error("có lỗi gì goy");
            return false;
        }
    };
}



