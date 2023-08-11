import React, { useState, useRef } from "react"
import { ArrowLeft } from "@untitled-ui/icons-react"
import { useFrappeGetDocList } from "frappe-react-sdk"
import testImg from '../img/test-img.png'
import { Link, useParams } from "react-router-dom"

const MyOrder = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFrappeGetDocList('Sales Invoice', {
    fields: ['name', 'posting_date', 'status', 'total'],
    limit: 100
  })

  const [status, setStatus] = useState()
  return (
    <>
      <header className='p-[14px] border-b border-b-[#F2F2F2] flex gap-x-[7px] text-md font-bold bg-white'>
        <Link to="/my-account">
          <span className="sr-only">Close panel</span>
          <ArrowLeft />
        </Link>
        รายละเอียดคำสั่งซื้อ
      </header>
      <main className="p-5 flex flex-col gap-y-[18px]">
        {data && (
          <>
            {data.map((d) => 
            <Link to={`/my-order-details/${d.name}`}>
              <div className="flex gap-x-[6px] items-center text-xs font-bold">
                <div className={`w-3 h-3 bg-[${d.status == "Unpaid" ? "#EAB600" : d.status == "Paid" ? "#009FF0" : "#000000"}] rounded-[99px]`}/>
                {d.status == "Unpaid" ? "รอการชำระเงิน" : d.status == "Paid" ? "เตรียมการจัดส่ง" : d.status == "Cancelled" ? "ยกเลิก" : "รับที่สาขา"}
              </div>

              <section className="flex gap-x-[14px] mt-[14px] pb-[18px] border-b border-b-[#E3E3E3]">
                <div>
                  <img src={testImg} />
                </div>
                <div className="flex w-3/4 flex-col gap-y-3">
                  <div className="flex">
                    <h2 className="w-[40%] text-xs">คำสั่งซื้อ</h2>
                    <p className="w-[60%] text-xs text-[#00B14F]">{d.name}</p>
                  </div>
                  <div className="flex">
                    <h2 className="w-[40%] text-xs">วันที่</h2>
                    <p className="w-[60%] text-xs">{d.posting_date}</p>
                  </div>
                  <div className="flex">
                    <h2 className="w-[40%] text-xs">จัดส่งภายใน</h2>
                    <p className="w-[60%] text-xs">3 - 4 วันทำการ<br/>Standard Delivery</p>
                  </div>
                  <div className="flex">
                    <h2 className="w-[40%] text-xs">การชำระเงิน</h2>
                    <p className="w-[60%] text-xs">โอนเงินผ่านธนาคาร</p>
                  </div>
                  <div className="flex">
                    <h2 className="w-[40%] text-xs">รวมการสั่งซื้อ</h2>
                    <p className="w-[60%] text-xs">฿ {d.total}</p>
                  </div>
                </div>
              </section>
            </Link>
            )}
          </>
        )}
      </main>
    </>
  )
}

export default MyOrder