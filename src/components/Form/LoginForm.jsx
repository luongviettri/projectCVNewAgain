import React from "react";
import { useDispatch } from "react-redux";
import { dangNhapAction } from "../../redux/actions/QuanLyNguoiDungAction";
import { NavLink } from "react-router-dom";
import { HomeFilled } from "@ant-design/icons";
import { useFormik } from "formik";
import { NavHashLink } from "react-router-hash-link";
export default function LoginForm() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      dispatch(dangNhapAction(values));
    },
  });
  return (
    <div>
      <div className="m-10 pt-10">
        <NavLink
          className="flex flex-row items-center align-baseline text-red-700 hover:text-red-500 md:justify-center lg:justify-start lg:px-12"
          to="/"
        >
          <HomeFilled className="text-4xl" />
          <div className="text-4xl tracking-wide ml-2 font-semibold my-2">
            CyberMovie
          </div>
        </NavLink>
      </div>
      <div className="px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-4 xl:px-24 xl:max-w-2xl">
        <h2 className=" text-center uppercase text-2xl text-red-700 font-bold lg:text-left xl:text-4xl my-3">
          Đăng Nhập
        </h2>
        <div className="flex flex-col">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              formik.handleSubmit();
            }}
          >
            <div className="text-lg font-bold text-white tracking-wide">
              Tài khoản:
            </div>
            <input
              name="taiKhoan"
              onChange={formik.handleChange}
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 text-black"
              placeholder="Nhập tài khoản"
            />

            <div className="mt-4">
              <div className="flex justify-between items-center">
                <div className="text-lg font-bold text-white tracking-wide">
                  Mật khẩu:
                </div>
              </div>
              <input
                name="matKhau"
                onChange={formik.handleChange}
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 text-black"
                placeholder="Nhập mật khẩu"
              />
            </div>
            <div className="mt-10 flex-col items-center align-middle ">
              <button
                className="bg-red-700 text-gray-100 rounded p-2 ml-16
                            font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-red-600
                            shadow-lg text-lg"
              >
                Đăng Nhập
              </button>
            </div>
          </form>
          <div className="mt-12 text-lg flex flex-row gap-2 font-semibold text-gray-400 text-center">
            <p>Chưa có tài khoản ? </p>
            <NavHashLink smooth to="/register#dangKy">
              <p className="cursor-pointer text-white hover:text-red-500 underline">
                Đăng ký
              </p>
            </NavHashLink>
          </div>
        </div>
      </div>
    </div>
  );
}
