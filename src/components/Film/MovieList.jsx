import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimAction";
import {
  SET_PHIM_DANG_CHIEU,
  SET_PHIM_DEFAULT,
  SET_PHIM_SAP_CHIEU,
} from "../../redux/actions/types/QuanLyPhimTypes";
import styleSlick from "../RSlick/MultipleRowSlick.module.css";
import MovieItem from "./MovieItem";
import { NextArrow } from "../../assets/icons/NextArrow";
import { PrevArrow } from "../../assets/icons/PrevArrow";
export default function MovieList(props) {
  const { data } = props;
  const dispatch = useDispatch();
  const activeStyle = {
    fontSize: "2.25rem",
    lineHeight: "2.5rem" /* 40px */,
    textTransform: "uppercase",
    color: "rgba(127, 29, 29,1)",
  };
  const inActiveStyle = {
    fontSize: "1.5rem",
    lineHeight: "2rem" /* 40px */,
    textTransform: "capitalize",
    color: "white",
  };
  const [active, setActive] = useState(0);
  useEffect(() => {
    setActive(1);
  }, []);
  const renderMovie = () => {
    return data?.map((item, index) => {
      return (
        <div className={`${styleSlick["width-item"]} cursor-pointer`}>
          <MovieItem item={item} key={index} />;
        </div>
      );
    });
  };
  const showPhimDangChieu = () => {
    if (active === 0 || active === 2 || active === 3) {
      dispatch({
        type: SET_PHIM_DANG_CHIEU,
      });
      setActive(1);
    } else {
      dispatch({ type: SET_PHIM_DEFAULT });
      setActive(0);
    }
  };
  const showPhimSapChieu = () => {
    if (active === 0 || active === 1) {
      dispatch({
        type: SET_PHIM_SAP_CHIEU,
      });
      setActive(2);
    } else {
      dispatch({ type: SET_PHIM_DEFAULT });
      setActive(0);
    }
  };
  const settings = {
    className: "center variable-width",
    centerMode: false,
    focusOnSelect: false,
    infinite: true,
    centerPadding: "20px",
    slidesToShow: 3,
    speed: 500,
    rows: 1,
    slidesPerRow: 2,
    variableWidth: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div className="container mx-auto">
      <div className="flex flex-row items-baseline justify-between my-10 ">
        <button
          style={active === 1 ? activeStyle : inActiveStyle}
          className="text-2xl px-8 py-3 font-semibold rounded-full text-white ml-5 text-left tracking-widest "
          onClick={showPhimDangChieu}
          api
        >
          Phim đang chiếu
        </button>
        <button
          type="button"
          className=" text-2xl px-8 py-3 font-semibold rounded-full text-white mr-5 text-right tracking-widest "
          style={active === 2 ? activeStyle : inActiveStyle}
          onClick={showPhimSapChieu}
        >
          Phim Sắp chiếu
        </button>
      </div>
      <Slider
        {...settings}
        className="border-b-2 border-t-2 border-gray-400 py-10"
      >
        {renderMovie()}
      </Slider>
      {/* <div className="grid grid-cols-2 gap-y-10 my-20">{renderMovie()}</div>; */}
    </div>
  );
}
