import { useRef, useState } from "react"
import { Link } from 'react-router-dom'
import logo from '../../img/logo.svg'
import thaiflag from '../../img/thai-flag.svg'
import germanflag from '../../img/german-flag.svg'
import { ArrowLeft, MarkerPin01 } from '@untitled-ui/icons-react'

const FillInfo = () => {
  const [filledInfo, setFilledInfo] = useState(true)
  return (
    <>
      <header className='p-[14px] border-b border-b-[#F2F2F2] flex gap-x-[7px]'>
        <Link to="/signup">
          <ArrowLeft />
        </Link>
        สมัครสมาชิก
      </header>
      <main className='px-5 py-[46px]'>
        <h1 className='text-[22px] font-bold'>ข้อมูลส่วนตัว</h1>
        <p className='mt-4'>กรอกข้อมูลเพิ่มเติมโดยข้อมูลเหล่านี้<br/> จะแสดงอยู่ในหน้าบัญชีของคุณ</p>

        <form action="#" className="flex flex-col gap-y-5">
          <div className='flex flex-col'>
            <label htmlFor='name'>ชื่อ</label>
            <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' id='name' name='name' type='text' />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='surname'>นามสกุล</label>
            <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' id='surname' name='surname' type='text'/>
          </div>

          <div className='flex flex-col'>
            <label htmlFor='email'>อีเมลของคุณ</label>
            <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' id='email' name='email' type='email'/>
          </div>

          <div className='flex flex-col'>
            <label htmlFor='id-card-number'>เลขบัตรประจำตัวประชาชน</label>
            <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' id='id-card-number' name='id-card-number' type='text'/>
          </div>

          <div className='flex flex-col'>
            <label htmlFor='birthdate'>วัน/เดือน/ปีเกิด</label>
            <input type="date" className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' id='birthdate' name='birthdate'/>
          </div>

          <div className='flex flex-col relative'>
            <label htmlFor='phone'>เบอร์โทร</label>
            <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' id='phone' name='phone' type='tel'/>

            <button className="absolute translate-y-[38px] right-[4px] bg-black text-white px-3 py-[6px] rounded-[6px]">แก้ไข</button>
          </div>
        </form>
      </main>
      <footer className='flex px-5 pb-5 gap-x-3'>
        <Link to="/success" className={`w-full text-white rounded-[9px] p-3 text-center ${!filledInfo ? "bg-[#C5C5C5] border border-[#C5C5C5]" : "bg-[#111111] border border-[#111111]"}`} disabled={!filledInfo}>ดำเนินการต่อ</Link>
      </footer>
    </>
  )
}

export default FillInfo