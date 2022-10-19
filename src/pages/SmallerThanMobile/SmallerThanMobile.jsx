import React from 'react'
import Dashboard from "../Admin/Dashboard/Dashboard"
export default function SmallerThanMobile() {

    return (
        <div className='bg-black h-screen w-screen'>
            <Dashboard />
            <p className='text-center font-bold text-2xl  text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>Vui lòng đăng nhập màn hình lớn hơn</p>
        </div>
    )
}
