import { Form, Input } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { dangKyAction } from "../../redux/actions/QuanLyNguoiDungAction";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 9,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 48,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const RegisterForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    const registerData = { ...values };
    dispatch(dangKyAction(registerData));
  };
  return (
    <div className="pt-2 px-10 flex-col align-middle items-center ">
      <h2 className="text-center tracking-wide uppercase text-4xl text-red-700 font-bold lg:text-center xl:text-4xl mt-5 mx-auto">
        Đăng Ký
      </h2>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        size="large"
        layout="horizontal"
        scrollToFirstError
      >
        <Form.Item
          name="taiKhoan"
          label={
            <label className="text-white font-semibold italic">Tài Khoản</label>
          }
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tài khoản!",
              whitespace: false,
            },
            {
              min: 4,
              max: 10,
              message: "4 - 10 chữ số",
            },
            {
              pattern: new RegExp(/^[a-z][a-z0-9_.]*$/),
              message: "Tài khoản không chấp nhận kí tự đặc biệt và chữ in hoa",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="text-sm font-bold text-gray-700"
          name="hoTen"
          label={
            <label className="text-white font-semibold italic">Họ Tên</label>
          }
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
          className="text-sm font-bold text-gray-700"
          name="email"
          label={
            <label className="text-white font-semibold italic">Email</label>
          }
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
          className="text-sm font-bold text-gray-700 p-5"
          name="matKhau"
          label={
            <label className="text-white font-semibold italic">Mật Khẩu</label>
          }
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
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          className="text-sm font-bold text-gray-700"
          name="confirm"
          label={
            <label className="text-white font-semibold italic">Xác Nhận</label>
          }
          dependencies={["matKhau"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Xác nhận lại mật khẩu!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("matKhau") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("Mật khẩu không khớp, vui lòng kiểm tra lại!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Xác nhận lại mật khẩu!" />
        </Form.Item>
        <Form.Item
          className="text-sm font-bold text-gray-700 "
          name="soDt"
          label={
            <label className="text-white font-semibold italic">
              Số Điện Thoại
            </label>
          }
          rules={[
            {
              required: true,
              message: "Vui lòng điền số điện thoại",
            },
            {
              min: 8,
              message: "Ít nhất 8 chữ số",
            },
          ]}
        >
          <Input
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <button
            type="danger"
            htmlType="submit"
            className=" rounded-lg border bg-red-500 hover:bg-red-700 py-2 w-full uppercase tracking-wider text-white text-lg font-bold"
          >
            Đăng ký
          </button>
          <div className="my-3 flex align-middle items-center w-full">
            <p className="text-lg italic font-bold  text-gray-300">
              Đã có tài khoản ?
            </p>
            <NavHashLink smooth to="/login#dangNhap">
              <p className="underline text-lg ml-1 text-red-700 hover:text-white mt-2">
                Đăng Nhập
              </p>
            </NavHashLink>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
