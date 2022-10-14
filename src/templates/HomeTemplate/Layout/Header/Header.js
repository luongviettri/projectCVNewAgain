import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { history } from "../../../../App";
import _ from "lodash";
import { TOKEN, USER_LOGIN } from "../../../../util/settings/config";
import { FormOutlined, HomeFilled, UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
const onClick = ({ key }) => {};
const menu = (
  <Menu
    onClick={onClick}
    items={[
      {
        label: (
          <NavHashLink smooth to="/profile#top">
            <button className="my-2 text-xl text-red-700 flex align-bottom gap-2 uppercase">
              <UserOutlined />
              Profile
            </button>
          </NavHashLink>
        ),
        key: "1",
      },
      {
        label: (
          <NavLink to="/admin">
            <p className="my-2 text-xl text-black flex align-bottom gap-2 uppercase ">
              <FormOutlined />
              Admin
            </p>
          </NavLink>
        ),
        key: "2",
      },
    ]}
  />
);

export default function Header(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <Fragment>
          <button
            onClick={() => {
              history.push("/login");
            }}
            className="self-center px-8 py-3 rounded"
          >
            Đăng Nhập
          </button>
          <button
            onClick={() => {
              history.push("./register");
            }}
            className="self-center px-8 py-3 font-semibold rounded bg-violet-600 text-gray-50"
          >
            Đăng Ký
          </button>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <Dropdown overlay={menu}>
          <button
            // onClick={() => {
            //   history.push("/profile");
            // }}
            className="self-center px-8 py-3 rounded"
          >
            <Space>
              <p className="border-2 p-1 border-red-500">
                <span className=" hover:text-red-500 text-lg text-white">
                  {userLogin.hoTen}
                </span>
              </p>
            </Space>
          </button>
        </Dropdown>

        <button
          className="text-white mx-2"
          onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            // ! đẩy user về login ==>> dùng lệnh này thay vì navigate hoặc history để load lại trang ===> xóa hết dữ liệu của user cũ
            window.location.href = "/home";
          }}
        >
          <p className="underline hover:text-red-500 text-lg">Log Out</p>
        </button>
      </Fragment>
    );
  };
  return (
    <header className="p-4 bg-opacity-40 bg-black text-white fixed w-full z-10">
      <div className="container flex justify-between h-16 mx-auto align-middle">
        <NavHashLink
          smooth
          to="/home#top"
          aria-label="Back to homepage"
          className="items-center p-2"
        >
          <img
            src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
            alt="cyberlearn.vn"
          />
        </NavHashLink>
        <ul className="space-x-10 flex mt-3 align-middle items-baseline">
          <li>
            {" "}
            <NavHashLink smooth to="/home/#top">
              <p className=" text-gray-200 hover:text-red-700 font-semibold text-xl">
                <HomeFilled />
              </p>
            </NavHashLink>
          </li>
          <li>
            <NavHashLink smooth to="/home/#danhSachPhim">
              <p className=" text-gray-200 hover:text-red-700 font-semibold text-xl">
                Danh Sách Phim
              </p>
            </NavHashLink>
          </li>
          <li>
            <NavHashLink
              smooth
              to="/home#danhSachRap"
              activeClassName="selected"
              activeStyle={{ color: "red" }}
            >
              <p className=" text-gray-200 hover:text-red-700 font-semibold text-xl">
                Danh Sách Rạp
              </p>
            </NavHashLink>
          </li>
          <li>
            <NavLink to="/admin">
              <p className=" text-gray-200 hover:text-red-500 font-semibold text-xl space-x-10">
                Admin
              </p>
            </NavLink>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          {renderLogin()}

          {/* <Select
            defaultValue="en"
            style={{ width: 120 }}
            onChange={handleChange}
          >
            <Option value="chi">China</Option>
            <Option value="en">English</Option>
            <Option value="vi">VietNam</Option>
          </Select> */}
        </div>
      </div>
    </header>
  );
}
