import React, { Fragment } from "react";
import { Rate, Tabs } from "antd";
import { NavLink } from "react-router-dom";
import moment from "moment/moment";
import { NavHashLink } from "react-router-hash-link";

const { TabPane } = Tabs;
export default class TheaterMenu extends React.PureComponent {
  state = {
    tabPosition: "top",
  };
  renderHeThongRap = () => {
    let { heThongRapChieu } = this.props;
    return heThongRapChieu?.map((heThongRap, index) => {
      let { tabPosition } = this.state;
      return (
        <TabPane
          tab={
            <div className="border-b-2 border-gray-400">
              <img
                src={heThongRap.logo}
                className="rounded-full mb-3 "
                width="50"
                alt=""
              />
            </div>
          }
          key={index}
        >
          <Tabs tabPosition={tabPosition}>
            {heThongRap.lstCumRap?.map((cumRap, index) => {
              return (
                <TabPane
                  tab={
                    <div
                      style={{
                        width: "400px",
                        display: "flex",
                      }}
                      className="flex justify-start align-bottom items-center gap-2 "
                    >
                      <img src={heThongRap.logo} width="50" alt="abc" />
                      <div className="text-center text-white text-lg hover:text-red-900 ml-2">
                        {cumRap.tenCumRap}
                      </div>
                    </div>
                  }
                  key={index}
                >
                  {cumRap.danhSachPhim.map((phim, index) => {
                    console.log("phim: ", phim);
                    return (
                      <Fragment key={index}>
                        <div className="my-5 pb-3 border-b-2 border-gray-50">
                          <div style={{ display: "flex" }}>
                            <img
                              style={{
                                height: 240,
                                width: 240,
                              }}
                              src={phim.hinhAnh}
                              alt={phim.tenPhim}
                              onError={(event) => {
                                event.target.onerror = null;
                                event.target.src =
                                  "https://picsum.photos/75/75";
                              }}
                            />
                            <div className="ml-2 ">
                              <NavLink
                                className="py-3"
                                to={`/detail/${phim.maPhim}`}
                              >
                                <div className="text-left flex items-baseline justify-start align-bottom cursor-pointer">
                                  <span className="bg-red-500 text-white font-bold text-md text-base">
                                    16+
                                  </span>
                                  <h3 className="text-2xl hover:text-red-900  font-bold uppercase text-gray-100 mx-2 ">
                                    {phim.tenPhim}
                                  </h3>
                                </div>
                              </NavLink>
                              <p className="text-xl italic text-gray-400">
                                {cumRap.diaChi}
                              </p>
                              <div className="grid grid-cols-4 gap-4 ">
                                {phim.lstLichChieuTheoPhim
                                  ?.slice(0, 12)
                                  .map((lichChieu, index) => {
                                    return (
                                      <NavLink
                                        to={`/checkout/${lichChieu.maLichChieu}`}
                                        className="text-md w-full text-center font-bold text-red-900 bg-gray-200 border-red-700 border-2 rounded p-2 hover:text-red-500 hover:bg-white duration-300"
                                        key={index}
                                      >
                                        {moment(
                                          lichChieu.ngayChieuGioChieu
                                        ).format("hh:mm A")}
                                      </NavLink>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };
  render() {
    const { tabPosition } = this.state;
    return (
      <>
        <NavHashLink smooth to="/home#danhSachRap">
          <h3 className="mx-10 text-5xl uppercase text-red-900 cursor-pointer">
            Danh Sách Cụm Rạp
          </h3>
        </NavHashLink>
        <Tabs tabPosition={tabPosition}>{this.renderHeThongRap()}</Tabs>
      </>
    );
  }
}
