import { Button, Form, Input, message, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import { useFormik } from 'formik';
import React from 'react'
import { useDispatch } from 'react-redux';
import * as yup from "yup";
import { addUserAction } from '../../../../redux/actions/QuanLyNguoiDungAction';
import { GROUPID } from '../../../../util/settings/config';
const { Item } = Form;
export default function AddUser(props) {
    const dispatch = useDispatch();
    const { history } = props;
    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
            email: "",
            soDt: "",
            maNhom: "GP01",
            maLoaiNguoiDung: "KhachHang",
            hoTen: ""
        },
        validationSchema: yup.object().shape({
            taiKhoan: yup
                .string()
                .min(4, "tài khoản không chấp nhận chữ in hoa, min 4, max 10, không kí tự đặc biệt")
                .max(20, "tài khoản không chấp nhận chữ in hoa, min 4, max 10, không kí tự đặc biệt")
                .matches(/^[a-z][a-z0-9_.]*$/, "tài khoản không chấp nhận chữ in hoa, min 4, max 10, không kí tự đặc biệt ")
                .required("Vui lòng nhập tài khoản"),
            matKhau: yup
                .string()
                .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "ít nhất 8 kí tự, có ít nhất 1 chữ và 1 số")
                .required("Vui lòng nhập thông tin"),
            email: yup.string().email("Sai định dạng email").required("Vui lòng nhập thông tin"),
            soDt: yup
                .string()
                .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, "Vui lòng nhập đúng số điện thoại")
                .required("Vui lòng nhập thông tin"),
            hoTen: yup
                .string()
                .matches(/^([^0-9]*)$/, "Tên không được chứa số")
                .required("Vui lòng nhập thông tin")
        }),
        onSubmit: values => {
            handleAddUser(values);
        }
    });
    const handleChange = value => {
        formik.setFieldValue("maLoaiNguoiDung", value);
    };
    const handleAddUser = async (values) => {
        // console.log("vaalues: ", values);
        const result = await dispatch(addUserAction(values))
        if (!result) return;
        // console.log('result: ', result);
        history.push("/admin/users")
        // try {
        //     // ! thêm thành công thì thông báo sau đó quay về trang quản lý user
        //     // const result = await QuanLyNguoiDungService.ThemNguoiDung(values);
        //     // message.success("Bạn thêm thành công rồi nà", 1);
        //     // setTimeout(() => {
        //     //     // navigate("/admin/users");
        //     //     // dispatch(hide_loading());
        //     // }, 1000);
        // } catch (error) {
        //     message.error(error.response.data.content);
        //     // dispatch(hide_loading());
        // }
    };


    return (
        <div className="container">
            <Form
                onSubmitCapture={() => {
                    formik.handleSubmit();
                }}
                labelCol={{
                    span: 4
                }}
                wrapperCol={{
                    span: 12
                }}
                initialValues={{
                    remember: true
                }}
                autoComplete="on">
                <Item className="text-white" label="Tài khoản">
                    <Input name="taiKhoan" onChange={formik.handleChange} value={formik.values.taiKhoan} />
                    {formik.errors.taiKhoan && formik.touched.taiKhoan && (
                        <p className="text-red-500">{formik.errors.taiKhoan}</p>
                    )}
                </Item>
                <Item className="text-white" label="Họ tên">
                    <Input name="hoTen" onChange={formik.handleChange} value={formik.values.hoTen} />
                    {formik.errors.hoTen && formik.touched.hoTen && <p className="text-red-500">{formik.errors.hoTen}</p>}
                </Item>
                <Item label="Mật khẩu">
                    <Input.Password
                        autoComplete="on"
                        name="matKhau"
                        onChange={formik.handleChange}
                        value={formik.values.matKhau}
                    />
                    {formik.errors.matKhau && formik.touched.matKhau && <p className="text-red-500">{formik.errors.matKhau}</p>}
                </Item>
                <Item className="text-white" label="Email">
                    <Input value={formik.values.email} name="email" onChange={formik.handleChange} />
                    {formik.errors.email && formik.touched.email && <p className="text-red-500">{formik.errors.email}</p>}
                </Item>
                <Item className="text-white" label="Số điện thoại">
                    <Input value={formik.values.soDt} name="soDt" onChange={formik.handleChange} />
                    {formik.errors.soDt && formik.touched.soDt && <p className="text-red-500">{formik.errors.soDt}</p>}
                </Item>
                <Item className="text-white" label="Loại người dùng">
                    <Select
                        defaultValue="KhachHang"
                        style={{
                            width: "100%"
                        }}
                        onChange={handleChange}>
                        <Option value="KhachHang">Khách hàng</Option>
                        <Option value="QuanTri">Quản lý</Option>
                    </Select>
                </Item>

                <Item
                    wrapperCol={{
                        offset: 8,
                        span: 16
                    }}>
                    <Button
                        // onClick={() => {
                        // }}
                        htmlType="submit"
                        type="primary">
                        Submit
                    </Button>
                </Item>
            </Form>
        </div>
    )
}
