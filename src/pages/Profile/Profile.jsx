import React from "react";
import UserInfo from "../../components/UserInfo/UserInfo";
import OrderHistory from "../../components/UserInfo/OrderHistory";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { layThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungAction";

export default function Profile() {
  const { thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const { thongTinDatVe } = thongTinNguoiDung;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layThongTinNguoiDungAction());
  }, [dispatch]);

  return (
    <div className="container mx-auto bg-black">
      <UserInfo id="userProfile" data={thongTinNguoiDung} />
      <OrderHistory id="orderHistory" data={thongTinDatVe} />
    </div>
  );
}
