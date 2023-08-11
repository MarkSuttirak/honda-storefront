import React from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import TitleHeader from '../components/TitleHeader';
import success from '../img/success.svg'
import kasikorn from '../img/kasikorn.svg'
import qrcode2 from '../img/qrcode2.svg'
import { Edit05, Copy01, Maximize01, ArrowUpRight } from '@untitled-ui/icons-react';
const BankInfoPage = () => {
  const [searchParams] = useSearchParams();

  return (
    <>
      <TitleHeader link='/' title='ใบเสร็จยืนยันคำสั่งซื้อ'/>
      <main className='p-5'>
        <section className='text-center mt-5'>
          <img src={success} className='m-auto'/>
          <p className='mt-8 text-[#424242] text-sm'>เราได้ส่งข้อความไลน์ และอีเมล<br/> ยืนยันพร้อมลายละเอียดการสั่งซื้อสินค้า<br/> ของคุณไปที่ <strong>jintapa01@mail.com</strong></p>

          <p className='mt-8 text-xs text-[#474747]'>คุณสามารถไปที่ <Link to='/' className='text-[#00B14F]'>คำสั่งซื้อของฉัน</Link> เพื่อติดตามสถานะ<br/> คำสั่งซื้อของคุณ หรือแจ้งโอนเงินทีหลังได้</p>
        </section>

        <hr className='my-[35px] border-[#E3E3E3]'/>

        <section>
          <h2>ข้อมูลการสั่งซื้อ</h2>
          <div className='flex flex-col gap-y-[14px] mt-[27px]'>
            <div className='flex'>
              <h3 className='text-[#010101] w-[40%] text-xs'>คำสั่งซื้อ</h3>
              <p className='text-[#00B14F] w-[60%] text-xs'>SHO7705236569</p>
            </div>
            <div className='flex'>
              <h3 className='text-[#010101] w-[40%] text-xs'>จัดส่งภายใน</h3>
              <p className='text-[#010101] w-[60%] text-xs'>3 - 4 วันทำการ<br/> Standard Delivery</p>
            </div>
            <div className='flex'>
              <h3 className='text-[#010101] w-[40%] text-xs'>ที่อยู่ในการจัดส่ง</h3>
              <p className='text-[#010101] w-[60%] text-xs'>999/99 พระราม 9 ถนมพระราม9 ห้วยขวาง กรุงเทพมหานคร 12050 ประเทศไทย</p>
            </div>
            <div className='flex'>
              <h3 className='text-[#010101] w-[40%] text-xs'>การชำระเงิน</h3>
              <p className='text-[#010101] w-[60%] text-xs'>บัตรเครดิต</p>
            </div>
          </div>
        </section>

        <hr className='my-[35px] border-[#E3E3E3]'/>

        <section>
          <h2 className='flex gap-x-2 items-center'>
            <Edit05 viewBox='0 0 24 24' width='18' height='18'/>
            โอนเงินเข้าบัญชี
          </h2>

          <div className='border border-[#EEEEEE] bg-[#F4F4F4] rounded-t-[20px] p-4 mt-[25px]'>
            <h2 className='flex items-center gap-x-[14px]'>
              <img src={kasikorn} />
              ธนาคารกสิกรไทย
            </h2>

            <div className='flex flex-col gap-y-[14px] mt-[27px]'>
              <div className='flex'>
                <h3 className='text-[#8A8A8A] text-xs'>ชื่อบัญชี:&nbsp;</h3>
                <p className='text-black text-xs'>zaviago จำกัด</p>
              </div>
              <div className='flex'>
                <h3 className='text-[#8A8A8A] text-xs'>สาขา:&nbsp;</h3>
                <p className='text-black text-xs'>ราชเทวี</p>
              </div>
              <div className='flex'>
                <h3 className='text-[#8A8A8A] text-xs'>บัญชี:&nbsp;</h3>
                <p className='text-black text-xs'>ออมทรัพย์</p>
              </div><br />
              <div className='flex justify-between'>
                <h3 className='text-[#8A8A8A] text-xs'>เลขที่:</h3>
                <p className='text-black text-xs flex gap-x-[6px] items-center'>
                  copy
                  <Copy01 viewBox='0 0 24 24' width='18' height='18'/>
                </p>
              </div>

              <button className={`block text-[#00A950] rounded-[9px] p-3 text-center w-full bg-white font-bold`}>
                123-4-56789-0
              </button>
            </div>

            <div className='mt-9 text-center'>
              <h2 className='text-[#010101] text-sm font-bold'>ยอดที่ต้องโอน</h2>
              <h1 className='inter font-bold text-[39px] mt-5'>฿ 4400.00</h1>

              <p className='text-[13px] mt-6 mb-4'>หมายเหตุ:<br/> เมื่อโอนแล้ว คุณลูกค้าอย่าลืมแจ้งโอนกับทาง<br/> แอดมินผ่านทางระบบด้วยค่ะ</p>
            </div>
          </div>
        </section>

        <section className='mt-10'>
          <h2 className='flex text-[#333333] items-center gap-x-[7px] justify-center'>
            <Maximize01 viewBox='0 0 24 24' width='18' height='18'/>
            หรือ Save QR ไปสแกน
          </h2>

          <img src={qrcode2} className='mx-auto mt-6'/>

          <button className={`text-white rounded-[9px] p-3 w-full bg-[#00A950] font-bold flex items-center justify-center mt-8`}>
            แจ้งโอนเงิน
            <ArrowUpRight viewBox='0 0 24 24' width='18' height='18' className='ml-1'/>
          </button>
        </section>
      </main>
      {/* <div className='p-4 h-screen w-screen flex flex-col  justify-center items-center bg-primary-100'>
        <div>
          <h1 className='text-3xl'>Thank you for your order: {searchParams.get("order_id")}</h1>
          <h3 className='text-xl'>Please transfer money to the following bank account:</h3>
          <h5 className='text-xl'>Bank: SCB</h5>
          <h5 className='text-xl'>Account Number: 123456789</h5>
          <h5 className='text-xl'>Account Name: John Doe</h5>
          <h5 className='text-xl'>Amount: ฿ {searchParams.get("amount")}</h5>
        </div>
      </div> */}
    </>
  )
}

export default BankInfoPage