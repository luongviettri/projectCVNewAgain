import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { editUserAction, getUserEditAction } from '../../../../redux/actions/QuanLyNguoiDungAction';
import * as yup from "yup"
import { Button, Form, Input, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
const { Item } = Form;

export default function EditUser(props) {
    const { history, match } = props;
    const { account } = match.params;
    const { userEdit } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserEditAction(account));
    }, [])
    console.log('userEdit: ', userEdit);
    // !lấy thông tin của object được gửi qua đây goy
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: userEdit?.taiKhoan,
            matKhau: userEdit?.matKhau,
            email: userEdit?.email,
            soDt: userEdit?.soDT,
            maNhom: userEdit?.maNhom,
            maLoaiNguoiDung: userEdit?.maLoaiNguoiDung,
            hoTen: userEdit?.hoTen
        },
        validationSchema: yup.object().shape({
            // taiKhoan: yup
            //     .string()
            //     .min(4, "tài khoản không chấp nhận chữ in hoa, min 4, max 10, không kí tự đặc biệt")
            //     .max(20, "tài khoản không chấp nhận chữ in hoa, min 4, max 10, không kí tự đặc biệt")
            //     .matches(/^[a-z][a-z0-9_.]*$/, "tài khoản không chấp nhận chữ in hoa, min 4, max 10, không kí tự đặc biệt ")
            //     .required("Vui lòng nhập tài khoản"),
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
        onSubmit: async values => {
            // ! bấm nút submit ==>  gửi API ( action ==> service ==> slice ) ==> nếu thành công thì thông báo và quay trở lại trang userManagement
            console.log('values: ', values);
            // await dispatch(display_loading());
            const result = await dispatch(editUserAction(values));
            if (!result) return;
            history.push("/admin/users");
        }
    });
    const handleChange = value => {
        formik.setFieldValue("maLoaiNguoiDung", value);
    };


    return (
        <div className="container">
            <Form
                // onSubmitCapture={formik.onSubmit}
                onSubmitCapture={() => {
                    formik.handleSubmit();
                }}
                // onSubmit={formik.onSubmit}
                labelCol={{
                    span: 4
                }}
                wrapperCol={{
                    span: 12
                }}
                initialValues={{
                    remember: true
                }}
                // onFinish={ }
                // onFinishFailed={onFinishFailed}
                autoComplete="on">
                <Item className="text-white" label="Tài khoản">
                    <Input name="taiKhoan" onChange={formik.handleChange} value={formik.values.taiKhoan} disabled={true} />
                    {/* {formik.errors.taiKhoan && formik.touched.taiKhoan && (
                        <p className="text-red-500">{formik.errors.taiKhoan}</p>
                    )} */}
                </Item>
                <Item className="text-white" label="Họ tên">
                    <Input name="hoTen" onChange={formik.handleChange} value={formik.values.hoTen} />
                    {formik.errors.hoTen && formik.touched.hoTen && <p className="text-red-500">{formik.errors.hoTen}</p>}
                </Item>
                <Item
                    label="Mật khẩu"
                >
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
                <Item className="text-white" label="Mã nhóm">
                    <Input value={formik.values.maNhom} name="maNhom" onChange={formik.handleChange} />
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
