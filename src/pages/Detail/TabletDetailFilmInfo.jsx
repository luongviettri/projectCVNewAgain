import { Progress, Rate } from 'antd'
import moment from 'moment'
import React from 'react'

export default function TabletDetailFilmInfo({ filmDetail }) {
    return (
        <div className="block lg:hidden  text-white w-full py-5 px-4">
            <h1 className="text-white">{filmDetail.tenPhim}</h1>
            <p className="text-white">
                {filmDetail.moTa}
            </p>
            <div className="flex w-full justify-between">
                <div className=" w-full md:w-2/3  text-center">
                    <Rate allowHalf value={filmDetail.danhGia / 2} disabled />
                    <p className="text-3xl italic font-semibold text-gray-400 pt-5">
                        {moment(filmDetail.ngayKhoiChieu).format("DD.MM.YYYY")}
                    </p>
                </div>
                <div className=" w-0 hidden md:w-1/3 md:block">
                    <Progress
                        width={80}
                        type="circle"
                        percent={`${filmDetail.danhGia * 10}`}
                        strokeColor={"rgba(185, 28, 28,1)"}
                        format={(percent) => `${percent / 10} /10`}
                        status="exception"
                    />
                </div>
            </div>
            <div className='block md:hidden'>
                <div className="flex">

                    <div className='w-1/2'>
                        <img
                            className="border-none rounded-lg block md:hidden"
                            src={filmDetail.hinhAnh}
                            alt="123"
                        />
                    </div>
                    <div className='w-1/2 flex justify-center items-center' >
                        <Progress

                            width={100}
                            type="circle"
                            percent={`${filmDetail.danhGia * 10}`}
                            strokeColor={"rgba(185, 28, 28,1)"}
                            format={(percent) => `${percent / 10} /10`}
                            status="exception"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
