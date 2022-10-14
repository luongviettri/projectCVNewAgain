import React, { Fragment } from "react";
import moment from "moment/moment";
import { NavHashLink } from "react-router-hash-link";

export default function OrderHistory({ data }) {
  const renderOrderHistory = () => {
    return data
      ?.slice(0)
      .reverse()
      .map((item, index) => {
        const { danhSachGhe } = item;
        const soGhe = danhSachGhe.map(({ tenGhe }) => tenGhe);
        return (
          <Fragment key={index.toString()}>
            <div
              className="flex items-center align-middle border-0 px-4 rounded-lg"
              style={{ backgroundColor: "rgba(60, 59, 59, 0.4)" }}
            >
              <img
                alt={item.tenPhim}
                className="max-h-60 bg-gray-100 object-center flex-shrink-0 mr-4"
                src={item.hinhAnh}
              />
              <div className="flex-wrap  pt-5">
                <p className="text-gray-300 italic text-lg font-bold ">
                  Ngày Đặt: {moment(item.ngayDat).format("DD-MM-YYYY")} |{" "}
                  {moment(item.ngayDat).format("hh:mm A")}.
                </p>
                <h2 className="text-red-700 text-2xl font-bold">
                  {item.tenPhim}
                </h2>
                <p className="text-white font-bold">
                  Thời lượng:{" "}
                  <span className="text-red-500 text-lg italic">
                    {item.thoiLuongPhim} phút
                  </span>{" "}
                </p>
                <p className="text-white font-bold">
                  Giá vé:{" "}
                  <span className="text-red-500 text-lg italic">
                    {item.giaVe} VND
                  </span>
                </p>
                <p className="font-bold text-success-500 text-xl">
                  {danhSachGhe[0].tenHeThongRap}
                </p>
                <p className="font-bold text-white text-lg">
                  <span className="text-red-white bg-red-700 px-1 border-none rounded-md text-center">
                    {danhSachGhe[0].tenCumRap}
                  </span>{" "}
                  , Ghế:{" "}
                  <span className="text-red-600 text-xl">
                    {" "}
                    {soGhe.join(" | ")}{" "}
                  </span>
                </p>
              </div>
            </div>
          </Fragment>
        );
      });
  };

  return (
    <div className="bg-black mt-10 border-b-2 border-gray-50">
      <NavHashLink smooth to="/profile#orderHistory">
        <h3 className="text-4xl hover:text-red-600 underline capitalize my-10 font-bold text-center text-red-700">
          Lịch sử đặt vé
        </h3>
      </NavHashLink>
      <div className="grid grid-cols-3 gap-6 mb-5">{renderOrderHistory()}</div>
    </div>
  );
}
