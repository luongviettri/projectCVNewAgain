import React from "react";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { editUserAction } from "../../redux/actions/QuanLyNguoiDungAction";
import { useEffect } from "react";
import { NavHashLink } from "react-router-hash-link";

export default function UserInfo({ data }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    form.setFieldsValue({
      taiKhoan: data.taiKhoan,
      matKhau: data.matKhau,
      hoTen: data.hoTen,
      email: data.email,
      soDT: data.soDT,
      maLoaiNguoiDung: data.maLoaiNguoiDung,
    });
  }, [form, data]);
  const onFinish = (values) => {
    const updateData = { ...values, maNhom: "GP00" };
    dispatch(editUserAction(updateData));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="container border-2 border-black ">
      <div
        className="relative mt-28 w-4/5 bg-black py-5 px-24  mx-auto rounded-xl "
        style={{
          backgroundColor: " rgba(60, 59, 59, 0.4)",
        }}
      >
        <NavHashLink smooth to="/profile#userProfile">
          <p className="font-bold text-red-700 text-center text-4xl uppercase underline hover:text-red-600">
            Thông tin tài khoản
          </p>
        </NavHashLink>
        <Form
          form={form}
          size="large"
          className="grid grid-cols-2"
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={
              <span className="font-bold text-lg text-white">Tài Khoản</span>
            }
            name="taiKhoan"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label={
              <span className="font-bold text-lg text-white">Mật khẩu</span>
            }
            name="matKhau"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu",
              },
              {
                pattern: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
                message:
                  "Ít nhất 8 kí tự, có ít nhất 1 chữ và 1 số và không có ký tự đặc biệt",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label={<span className="font-bold text-lg text-white">Họ Tên</span>}
            name="hoTen"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ tên!",
                whitespace: true,
              },
              {
                pattern: new RegExp(/^([^0-9]*)$/),
                message: "Tên không được chứa số",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<span className="font-bold text-lg text-white">Email</span>}
            name="email"
            rules={[
              {
                type: "email",
                message: "Email không hợp lệ!",
              },
              {
                required: true,
                message: "Vui lòng điền Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <span className="font-bold text-lg text-white">Điện Thoại</span>
            }
            name="soDT"
            rules={[
              {
                required: true,
                message: "Vui lòng điền số điện thoại",
              },
              {
                min: 8,
                message: "Ít nhất 8 chữ số",
              },
              {
                pattern: new RegExp(/^[0-9]+$/),
                message: "Định dạng không hợp lệ",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<span className="font-bold text-lg text-white">Type</span>}
            name="maLoaiNguoiDung"
            rules={[
              {
                required: true,
                message: "Mã người dùng không hợp lệ!",
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item />
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <button
              className="bg-red-700 hover:bg-red-600 uppercase tracking-widest text-lg items-end text-white py-2 px-3 rounded"
              htmlType="submit"
            >
              Update
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
