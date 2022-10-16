import React from "react";
import { Modal, Rate } from "antd";
import { history } from "../../App";
import { PlayIcon } from "../../assets/icons/PlayIcon";
import { useState } from "react";
import ReactPlayer from "react-player";
import { NavLink } from "react-router-dom";
import { CalendarOutlined } from "@ant-design/icons";
import moment from "moment";
import { debounce, set } from "lodash";
export default function MovieItem(props) {
  const { item } = props;
  // console.log("item: ", item);
  // Set up Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const debouncedHandleMouseEnter = debounce(() => setIsShown(true), 200);
  const handlOnMouseLeave = () => {
    setIsShown(false);
    debouncedHandleMouseEnter.cancel();
  };
  const renderItem = () => {
    return (
      <div
        className={`overflow-hidden relative bg-cover bg-no-repeat border-none rounded-lg shadow-lg my-2 duration-500 ${
          item.dangChieu ? "bg-center" : "bg-top"
        }`}
        style={{
          width: "400px",
          height: "240px",
          backgroundImage: `url(${item.hinhAnh})`,
        }}
        onMouseEnter={debouncedHandleMouseEnter}
        onMouseLeave={handlOnMouseLeave}
      >
        {isShown && (
          <div
            className="flex-col justify-between absolute top-0  w-full h-full z-50"
            style={{
              backgroundColor: " rgba(0,0,0,0.5)",
            }}
          >
            <div className="flex items-baseline mt-3">
              <div className="flex items-baseline justify-start mx-5 flex-shrink-0 w-3/4 cursor-pointer">
                <span className="border border-red-500 text-md font-bold bg-red-500 text-white mr-1 text-base">
                  16+
                </span>

                <h3 className=" text-left truncate hover:text-sm overflow-hidden uppercase text-xl font-bold ">
                  <NavLink
                    className="text-white hover:text-red-700"
                    to={`detail/${item.maPhim}`}
                  >
                    {item.tenPhim}
                  </NavLink>
                </h3>
              </div>
              <div
                style={
                  item.hot === true ? { display: "block" } : { display: "none" }
                }
                className="border border-red-500 text-md font-bold bg-red-500 text-white mr-1 text-base"
              >
                HOT
              </div>
            </div>
            <div className="ml-5">
              <Rate disabled allowHalf value={item.danhGia / 2} />
              <p className="text-gray-300 font-bold italic text-lg mt-1">
                {moment(item.ngayKhoiChieu).format("MMMM Do, YYYY")}
              </p>
            </div>
            <div className=" mx-5">
              <button
                onClick={showModal}
                className=" bg-red-500 text-md  px-3 py-2 rounded hover:bg-red-700 duration-300 text-white items-center align-middle uppercase  flex"
              >
                <PlayIcon />
                <span className="mx-1 text-center tracking-widest">
                  Trailer
                </span>
              </button>
              <button
                onClick={() => {
                  history.push(`/detail/${item.maPhim}`);
                }}
                className="border-2 border-red-500  text-md mt-2 uppercase text-center  px-3 py-2 rounded  bg-gray-300 text-red-700 hover:bg-white font-bold duration-300 "
              >
                {item.dangChieu === true ? (
                  <div className="flex text-base items-center align-bottom justify-center">
                    <CalendarOutlined />
                    <span className="mx-1">Đặt Vé</span>
                  </div>
                ) : (
                  <span>Xem Chi Tiết</span>
                )}
              </button>
            </div>
            <Modal
              bodyStyle={{
                backgroundColor: "black",
              }}
              className="flex align-middle items-center"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
              destroyOnClose={true}
            >
              <div className="">
                <ReactPlayer url={item.trailer} controls={true} />
              </div>
            </Modal>
          </div>
        )}
      </div>
    );
  };
  return <div>{renderItem()}</div>;
}
