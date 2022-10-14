import {
  SET_DANH_SACH_PHIM,
  SET_PHIM_DANG_CHIEU,
  SET_PHIM_DEFAULT,
  SET_PHIM_SAP_CHIEU,
  SET_THONG_TIN_PHIM,
} from "../actions/types/QuanLyPhimTypes";
import { SET_CHI_TIET_PHIM } from "../actions/types/QuanLyRapTypes";
import _ from "lodash";
const stateDefault = {
  arrFilm: [
    {
      maPhim: 1282,
      tenPhim: "Ban tay diet quy",
      biDanh: "ban-tay-diet-quy",
      trailer: "https://www.youtube.com/embed/uqJ9u7GSaYM",
      hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png",
      moTa: "Newlywed couple Ted and Tami-Lynn want to have a baby, but in order to qualify to be a parent, Ted will have to prove he's a person in a court of law.",
      maNhom: "GP00",
      ngayKhoiChieu: "2019-07-29T00:00:00",
      danhGia: 5,
      hot: true,
      dangChieu: false,
      sapChieu: true,
    },
    {
      maPhim: 1282,
      tenPhim: "Ban tay diet quy",
      biDanh: "ban-tay-diet-quy",
      trailer: "https://www.youtube.com/embed/uqJ9u7GSaYM",
      hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png",
      moTa: "Newlywed couple Ted and Tami-Lynn want to have a baby, but in order to qualify to be a parent, Ted will have to prove he's a person in a court of law.",
      maNhom: "GP00",
      ngayKhoiChieu: "2019-07-29T00:00:00",
      danhGia: 5,
      hot: true,
      dangChieu: false,
      sapChieu: true,
    },
  ],
  arrFilmDefault: [],
  filmDetail: {},
  thongTinFilm: {},
};

export default function QuanLyPhimReducer(state = stateDefault, action) {
  switch (action.type) {
    case SET_DANH_SACH_PHIM: {
      const { arrFilm } = action;
      console.log("arrFilm: ", arrFilm);
      const arrFilmDangChieu = arrFilm.filter(
        (item) => item.dangChieu === true
      );
      return { ...state, arrFilm: arrFilmDangChieu, arrFilmDefault: arrFilm };
    }
    case SET_PHIM_DANG_CHIEU: {
      const { arrFilmDefault } = state;
      const arrFilmDangChieu = arrFilmDefault.filter(
        (item) => item.dangChieu === true
      );
      return { ...state, arrFilm: arrFilmDangChieu };
    }
    case SET_PHIM_SAP_CHIEU: {
      const { arrFilmDefault } = state;
      const arrFilmSapChieu = arrFilmDefault.filter(
        (item) => item.dangChieu !== true
      );
      return { ...state, arrFilm: arrFilmSapChieu };
    }
    case SET_PHIM_DEFAULT: {
      const { arrFilmDefault } = state;
      return { ...state, arrFilm: arrFilmDefault };
    }
    case SET_CHI_TIET_PHIM: {
      const { filmDetail } = action;
      // state.filmDetail = action.filmDetail;
      return { ...state, filmDetail };
    }
    case SET_THONG_TIN_PHIM: {
      const { thongTinFilm } = action;
      return { ...state, thongTinFilm };
    }
    default:
      return state;
  }
}
