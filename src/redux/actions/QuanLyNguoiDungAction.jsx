import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import {
  DANG_KY_ACTION,
  DANG_NHAP_ACTION,
  EDIT_USER,
  GET_USER_LIST,
  SET_THONG_TIN_NGUOI_DUNG,
} from "./types/QuanLyNguoiDungTypes";
import { message } from "antd";
import { history } from "../../App";

export const dangNhapAction = (user) => {
  return async (dispatch) => {
    try {
      const { data, status } = await quanLyNguoiDungService.dangNhap(user);
      if (status === 200) {
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: data.content,
        });
        message.success("Đăng nhập thành công", 1);
        //! chuyển hướng về trang chủ
        setTimeout(() => {
          history.replace({ pathname: "/" });
        }, 1000);
      }
    } catch (err) {
      console.log("err: ", err);
      if (err.response) {
        let { content } = err.response.data;
        message.error(content);
      }
    }
  };
};
export const dangKyAction = (user) => {
  return async (dispatch) => {
    try {
      const { data, status } = await quanLyNguoiDungService.dangKy(user);
      if (status === 200) {
        dispatch({
          type: DANG_KY_ACTION,
          thongTinDangKy: data.content,
        });
        message.success("Đăng ký thành công");
        setTimeout(history.push({ pathname: "/login" }), 500);
      }
    } catch (err) {
      if (err.response) {
        let { content } = err.response.data;
        message.error(content);
      }
    }
  };
};

export const layThongTinNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const { data, status } = await quanLyNguoiDungService.layLichSuDatVe();
      let { content } = data;
      if (status === 200) {
        dispatch({
          type: SET_THONG_TIN_NGUOI_DUNG,
          thongTinNguoiDung: content,
        });
      } else {
        console.log("có lỗi gì goy");
      }
    } catch (err) {
      console.log("err: ", err);
    }
  };
};
export const layDanhSachUserAction = (tenPhim) => {
  return async (dispatch) => {
    try {
      const { data, status } = await quanLyNguoiDungService.layDanhSachUser(
        tenPhim
      );
      if (status === 200) {
        dispatch({
          type: GET_USER_LIST,
          userList: data.content,
        });
      } else {
        console.log("có lỗi gì goy");
      }
    } catch (err) {
      console.log("err: ", err);
    }
  };
};
export const deleteUserAction = (deleteAccount) => {
  console.log("deleteAccount:>>> ", deleteAccount);
  return async (dispatch) => {
    try {
      const { data, status } = await quanLyNguoiDungService.deleteUser(
        deleteAccount
      );
      if (status === 200) {
        message.success(
          "Xóa thành công tài khoản " + deleteAccount + " rồi nà"
        );
        dispatch(layDanhSachUserAction());
      } else {
        message.error("có lỗi gì goy");
      }
    } catch (error) {
      message.error("có lỗi gì goy");
      console.log("error: ", error);
    }
  };
};
export const addUserAction = (newUser) => {
  return async (dispatch) => {
    try {
      const { data, status } = await quanLyNguoiDungService.addUser(newUser);
      if (status === 200) {
        message.success(`Bạn đã thêm user ${newUser.taiKhoan} thành công`);
        dispatch(layDanhSachUserAction());
        return true;
      } else {
        message.error("có lỗi gì goy");
        return false;
      }
    } catch (error) {
      message.error("có lỗi gì goy");
      console.log("error: ", error);
      return false;
    }
  };
};
export const getUserEditAction = (account) => {
  return async (dispatch) => {
    try {
      const { data, status } = await quanLyNguoiDungService.getUserEdit(
        account
      );
      if (status === 200) {
        // message.success(`Bạn đã thêm user ${newUser.taiKhoan} thành công`);
        // dispatch(layDanhSachUserAction());
        // return true;
        dispatch({
          type: EDIT_USER,
          userEdit: data.content,
        });
      } else {
        // message.error("có lỗi gì goy");
        // return false;
      }
    } catch (error) {
      message.error("có lỗi gì goy");
      console.log("error: ", error);
      return false;
    }
  };
};
export const editUserAction = (userEdited) => {
  // console.log('userEdited: ', userEdited);
  return async (dispatch) => {
    try {
      const { data, status } = await quanLyNguoiDungService.editUser(
        userEdited
      );
      console.log("status: ", status);
      console.log("data: ", data);
      if (status === 200) {
        message.success(`${userEdited.taiKhoan} đã cập nhật thành công`);
        // dispatch(layDanhSachUserAction());
        // return true;
        dispatch({
          type: EDIT_USER,
          userEdit: data.content,
        });
      } else {
        message.error("có lỗi gì goy");
        return false;
      }
    } catch (error) {
      message.error("có lỗi gì goy");
      return false;
    }
  };
};
