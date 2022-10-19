import React, { useEffect, useState } from "react";
import "../../assets/styles/circle.css";
import { Tabs, Rate, Progress } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinChiTietPhim } from "../../redux/actions/QuanLyRapAction";
import moment from "moment/moment";
import { NavLink } from "react-router-dom";
import ReactPlayer from "react-player";
import TabletDetailFilmInfo from "./TabletDetailFilmInfo";
const { TabPane } = Tabs;
export default function Detail(props) {
  const { filmDetail } = useSelector((state) => state.QuanLyPhimReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const { id } = props.match.params;
    dispatch(layThongTinChiTietPhim(id));
  }, []);

  return (
    <div
      className="bg-black container pt-32 mx-auto"
      style={{
        // backgroundImage: `url(${filmDetail.hinhAnh})`,
        backgroundSize: "100%",
        backgroundPosition: "center",
      }}
    >
      <div
        className="flex flex-row  mx-auto border-none rounded-md  w-full lg:w-4/5 "
        style={{ backgroundColor: " rgba(60, 60, 60, 0.4)" }}
      >
        <div className="md:m-5 m-0">
          <div className="flex">
            <div>
              <img
                className="border-none rounded-lg hidden md:block"
                src={filmDetail.hinhAnh}
                alt="123"
              />
            </div>
            <div className="ml-5 overflow-hidden  hidden lg:block  ">
              <p className=" flex flex-col">
                <h3 className="text-4xl font-bold text-red-700 uppercase">
                  {filmDetail.tenPhim} {" - "}
                  <span className="text-3xl italic font-semibold text-gray-400">
                    {moment(filmDetail.ngayKhoiChieu).format("DD.MM.YYYY")}
                  </span>
                </h3>
                <Rate allowHalf value={filmDetail.danhGia / 2} disabled />
              </p>
              <p className={`text-white text-md leading-6 tracking-wide hidden lg:block `}>
                {filmDetail.moTa}
              </p>
            </div>
          </div>
        </div>
        <div className="mx-10 mt-24 hidden lg:block">
          <div className=" gap-4 flex-col justify-center items-center cursor-pointer  flex ">
            <Progress
              width={180}
              type="circle"
              percent={`${filmDetail.danhGia * 10}`}
              strokeColor={"rgba(185, 28, 28,1)"}
              format={(percent) => `${percent / 10} /10`}
              status="exception"
            />
          </div>

        </div>

        {/* //! chỗ này của tablet */}

        <TabletDetailFilmInfo filmDetail={filmDetail} />

      </div>

      <div
        className="mt-20 w-4/5 mx-auto bg-black rounded-lg px-5 py-5 text-xl  hover:text-red-500 "
        style={{ backgroundColor: " rgba(60, 59, 59, 0.4)" }}
      >
        <Tabs defaultActiveKey="1" centered size="large">
          <TabPane
            className="flex align-middle items-center text-lg font-bold"
            tab={
              <p className="text-white text-2xl hover:text-red-700  capitalize tracking-wide   ">
                Trailer
              </p>
            }
            key="1"
            style={{ minHeight: "300px", fontSize: "24px" }}
          >
            <ReactPlayer width={900} url={filmDetail.trailer} controls={true} />
          </TabPane>
          <TabPane
            tab={
              <p className="text-white text-2xl hover:text-red-700  capitalize tracking-wide">
                Lịch Chiếu
              </p>
            }
            key="2"
            style={{ minHeight: "300px" }}
          >
            <div>
              <Tabs tabPosition={"left"}>
                {filmDetail.heThongRapChieu?.map((htr, index) => {
                  return (
                    <TabPane
                      tab={
                        <div>
                          <img
                            src={htr.logo}
                            alt="abc"
                            className="rounded-full"
                            width="50"
                          />
                        </div>
                      }
                      key={index}
                    >
                      {htr.cumRapChieu?.map((cumRap, index) => {
                        return (
                          <div className="mt-5" key={index}>
                            <div className="flex flex-row  items-center">
                              <img
                                src={cumRap.hinhAnh}
                                alt="123"
                                className="lg:w-24 lg:h-24 w-20 h-20  lg:mt-0 hidden md:block"
                              />
                              <div className="ml-2 flex flex-col justify-center">
                                <p className="text-white font-bold lg:text-2xl ">
                                  {cumRap.tenCumRap}
                                </p>
                                <p className="text-gray-400 lg:text-xl italic font-semibold mb-5">
                                  {cumRap.diaChi}
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-8 md:gap-4 lg:gap-4 my-2 lg:my-5">
                              {cumRap.lichChieuPhim
                                ?.slice(0, 12)
                                .map((lichChieu, index) => {
                                  return (
                                    <NavLink
                                      to={`/checkout/${lichChieu.maLichChieu}`}
                                      key={index}

                                    >
                                      <button className="col-span-1 text-red-700 text-green-80 font-bold border-2 rounded-lg border-red-700 bg-gray-200 hover:bg-white py-2 px-2">
                                        {moment(
                                          lichChieu.ngayChieuGioChieu
                                        ).format("hh:mm A")}
                                      </button>
                                    </NavLink>
                                  );
                                })}
                            </div>
                          </div>
                        );
                      })}
                    </TabPane>
                  );
                })}
              </Tabs>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
