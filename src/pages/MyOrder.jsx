import React, { useState, useRef } from "react"
import { ArrowLeft } from "@untitled-ui/icons-react"
import { useFrappeGetDocList, useFrappeGetCall } from "frappe-react-sdk"
import testImg from '../img/test-img.png'
import { Link, useParams } from "react-router-dom"

const MyOrder = () => {
  const { id } = useParams();
  const [myorderlist, setmyorderlist] = useState()
 
  const { data, isLoading, error } = useFrappeGetDocList('Sales Invoice', {
    fields: ['name', 'posting_date', 'status', 'total'],
    limit: 1000,
    orderBy: {
      field: 'posting_date',
      order: 'desc'
    }
  })



  const { myorders } = useFrappeGetCall('honda_api.api_calls.getuser.getorders', {}, 'user-profile', {
      isOnline: () => getToken(),
      onSuccess: (data) => {
        setmyorderlist(data.message)
      }
  })



  const [status, setStatus] = useState()
  return (
    <>
      <header className='p-[14px] border-b border-b-[#F2F2F2] flex gap-x-[7px] text-md font-bold bg-white fixed w-full top-0 bg-white z-[999]'>
        <Link to="/reward-history">
          <span className="sr-only">Close panel</span>
          <ArrowLeft />
        </Link>
        รายละเอียดคำสั่งซื้อ
      </header>
      <main className="p-5 flex flex-col gap-y-[18px] mt-[53px]">
        {myorderlist && (
          <>
            {myorderlist.map((d) => 
            <Link to={`/my-order-details/${d.name}`}>
              <section className="flex gap-x-[14px] mt-[14px] pb-[18px] border-b border-b-[#E3E3E3]">
                {/* <div>
                  <img src={testImg} />
                </div> */}
                <div className="flex w-full flex-col gap-y-3">
                  <div className="flex">
                    <h2 className="w-[40%] text-xs">คำสั่งซื้อ</h2>
                    <p className="w-[60%] text-xs text-[#F0592A]">{d.name}</p>
                  </div>
                  <div className="flex">
                    <h2 className="w-[40%] text-xs">วันที่</h2>
                    <p className="w-[60%] text-xs">{d.posting_date}</p>
                  </div>
                   <div className="flex">
                    <h2 className="w-[40%] text-xs">Status</h2>
                    <p className="w-[60%] text-xs">
                      {d.delivery_notes[0]?.status === 'Draft' ? 'Active' : d.delivery_notes[0]?.status === 'Submitted' ? 'Coupon is used' : ''}
                    </p>
                  </div>
                  <div className="w-full">
                    <Link to={`/my-order-details/${d.name}`} className='w-full block text-white rounded-[9px] p-3 text-center' style={{background:"linear-gradient(133.91deg, #F16A28 1.84%, #F9A30F 100%)"}}>ดูข้อมูล</Link>
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