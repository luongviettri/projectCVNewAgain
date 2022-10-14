import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import {
  DANG_NHAP_ACTION,
  EDIT_USER,
  GET_USER_INFO,
  GET_USER_LIST,
  SET_THONG_TIN_NGUOI_DUNG,
} from "../actions/types/QuanLyNguoiDungTypes";
// ! xử lý lưu thông tin đăng nhập của user
let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const initialState = {
  userLogin: user,
  thongTinNguoiDung: {},
  userList: [],
  userEdit: {},
};
export default function QuanLyNguoiDungReducer(state = initialState, action) {
  switch (action.type) {
    case DANG_NHAP_ACTION: {
      const { thongTinDangNhap } = action;
      localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
      localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);
      return { ...state, userLogin: thongTinDangNhap };
    }
    case SET_THONG_TIN_NGUOI_DUNG: {
      const { thongTinNguoiDung } = action;
      return { ...state, thongTinNguoiDung };
    }
    case GET_USER_LIST: {
      const { userList } = action;
      return { ...state, userList: userList };
    }
    case EDIT_USER: {
      const { userEdit } = action;
      localStorage.setItem(USER_LOGIN, JSON.stringify(userEdit));
      return { ...state, userLogin: userEdit, userEdit };
    }
    default:
      return state;
  }
}
