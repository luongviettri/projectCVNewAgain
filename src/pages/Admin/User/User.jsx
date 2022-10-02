import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Input, PageHeader, Table, Tag } from "antd";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAction, layDanhSachUserAction } from "../../../redux/actions/QuanLyNguoiDungAction";

const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
};

const { Search } = Input;
export default function Users(props) {
    const { history } = props;
    console.log('history: ', history);
    const dispatch = useDispatch();
    ////////////////////////////////////////////////////////////////////////////////////////////////todo:
    //! lấy dữ liệu về
    const { userList } = useSelector((state) => state.QuanLyNguoiDungReducer);
    useEffect(() => {
        dispatch(layDanhSachUserAction());
    }, []);
    // ! debounce search
    const searchRef = useRef(null);
    // setData(userList);
    // ! dùng useEffect để gọi dữ liệu và lưu về slice
    useEffect(() => {
        // dispatch(NguoiDungSliceActions.getUserList());
    }, []);
    // let data = userList;
    // ! chỉnh lại mảng data
    // ! thêm button
    const handleEditUser = (editAccount) => {
        console.log('editAccount: ', editAccount);
        history.push(`/admin/users/edit/${editAccount}`)
        // navigate(`edit/${userEdit.taiKhoan}`);
    };
    const handleDeleteUser = (deleteAccount) => {
        // console.log('deleteAccount: ', deleteAccount);
        dispatch(deleteUserAction(deleteAccount))
        // dispatch(NguoiDungSliceActions.deleteUser(userAccount));
    };

    const handleOnBack = () => {
        history.push("/admin")
    }
    // ! chỉnh lại mảng columns
    const columns = [
        {
            title: "Họ và tên",
            dataIndex: "hoTen",
            sorter: (a, b) => a.hoTen.length - b.hoTen.length,
            sortDirections: ["descend"],
            // width: "1%",
        },
        {
            title: "Tài khoản",
            dataIndex: "taiKhoan",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.taiKhoan.length - b.taiKhoan.length,
            // width: "1%",
        },
        {
            title: "Mật khẩu",
            dataIndex: "matKhau",
            defaultSortOrder: "descend",
            // width: "20%",
        },
        {
            title: "Mã User",
            dataIndex: "maLoaiNguoiDung",
            defaultSortOrder: "descend",
            render: (text, record, index) => {
                return text == "QuanTri" ? (
                    <Tag color="magenta">Quản trị</Tag>
                ) : (
                    <Tag color="cyan">Khách hàng</Tag>
                );
            },
            // width: "20%",
        },
        {
            title: "Tùy chỉnh",
            defaultSortOrder: "descend",
            render: (text, record, index) => {
                return (
                    <div className="flex gap-4">
                        <Button
                            onClick={() => {
                                handleEditUser(record.taiKhoan);
                            }}
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                        />
                        <Button
                            onClick={() => {
                                handleDeleteUser(text.taiKhoan);
                            }}
                            type="default"
                            shape="circle"
                            icon={<DeleteOutlined />}
                        />
                    </div>
                );
            },
            // width: "20%",
        },
    ];
    const data = userList;
    // ! filter data
    const handleChange = (event) => {
        let { value } = event.target;
        value = value.toLowerCase();
        // ! lấy kí tự cần tìm==> gọi API ==> khi trả về thì lấy data gán lại state

        if (searchRef.current) {
            clearTimeout(searchRef.current);
        }
        searchRef.current = setTimeout(() => {
            // dispatch(NguoiDungSliceActions.searchUser(value));
            dispatch(layDanhSachUserAction(value));
        }, 300);

    };
    const onSearch = (value) => {
        dispatch(layDanhSachUserAction(value));
    };
    return (
        <div className=" mx-auto bg-slate-300">
            <PageHeader
                className="site-page-header"
                onBack={handleOnBack}
                title="User Management"
            />
            <div className="container">
                <div className="flex justify-between p-4">
                    <div className="col-6">
                        <Button
                            type="primary"
                            onClick={() => {
                                history.push("/admin/users/addnew")
                            }}
                        >
                            New User
                        </Button>
                    </div>
                    <div className="col-6 text-3xl text-black">
                        {/* //! làm chức năng search user */}
                        <Search
                            placeholder="input search text"
                            onChange={handleChange}
                            onSearch={onSearch}
                            enterButton
                        />
                    </div>
                </div>
            </div>

            <Table
                scroll={{
                    x: 1300,
                    y: 500,
                }}
                rowKey={(record) => record.email}
                columns={columns}
                dataSource={data}
                onChange={onChange}
            />
        </div>
    );
}
