import React from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import TitleHeader from '../components/TitleHeader';
import success from '../img/success.svg'
import kasikorn from '../img/kasikorn.svg'
import qrcode2 from '../img/qrcode2.svg'
import mascot from '../img/mascot.svg'
import { Edit05, Copy01, Maximize01, ArrowUpRight } from '@untitled-ui/icons-react';
import { useFrappePostCall } from 'frappe-react-sdk';
const BankInfoPage = () => {
  const [searchParams] = useSearchParams();

  const { call, isCompleted, result } = useFrappePostCall('headless_e_commerce.api.place_order');

  return (
    <>
      <TitleHeader link='/my-order' title='ข้อมูลการแลกของรางวัล'/>
      <main className='p-5'>
        <section className='text-center mt-5'>
          <img src={mascot} className='m-auto'/>
          <p className='mt-8 text-[#424242] text-sm'>คุณได้ทำการ แลกของรางวัล <span>ปลอกเข็มขัดนิรภัย</span><br/> เรียบร้อยแล้ว กรุณารับของรางวัล<br/> ตามสาขาที่คุณกำหนด</p>

          <p className='mt-8 text-xs text-[#474747]'>คุณสามารถไปที่ <Link to='/reward-history' className='text-[#F0592A]'>ประวัติการใช้คะแนน</Link><br/>ของคุณเพื่อตรวจสอบประวัติและการใช้งานคะแนน</p>
        </section>

        <hr className='my-[35px] border-[#E3E3E3]'/>

        <section>
          <h2>ข้อมูลการแลกของรางวัล</h2>
          <div className='flex flex-col gap-y-[14px] mt-[27px]'>
            <div className='flex'>
              <h3 className='text-[#010101] w-[40%] text-xs'>คำสั่งซื้อ</h3>
              <p className='text-[#F0592A] w-[60%] text-xs'>SHO7705236569</p>
            </div>
            <div className='flex'>
              <h3 className='text-[#010101] w-[40%] text-xs'>รับที่สาขา</h3>
              <p className='text-[#010101] w-[60%] text-xs'>สาขา นนทบุรี</p>
            </div>
            <div className='flex'>
              <h3 className='text-[#010101] w-[40%] text-xs'>ของรางวัล</h3>
              <p className='text-[#010101] w-[60%] text-xs'>เข็มขัดนิรภัย</p>
            </div>
            <div className='flex'>
              <h3 className='text-[#010101] w-[40%] text-xs'>วันที่</h3>
              <p className='text-[#010101] w-[60%] text-xs'>24-07-2023</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default BankInfoPage