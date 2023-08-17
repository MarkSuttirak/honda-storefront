import React, { useState, useRef } from "react"
import { ArrowLeft } from "@untitled-ui/icons-react"
import { useFrappeGetDocList } from "frappe-react-sdk"
import testImg from '../img/test-img.png'
import { Link, useParams } from "react-router-dom"
import Percent from "../components/icons/Percent"
import { ShoppingBag02 } from "@untitled-ui/icons-react"

const MyOrder = () => {
  const [currentTab, setCurrentTab] = useState('คะแนนที่ได้รับ');
  const { id } = useParams();
  const { data, isLoading, error } = useFrappeGetDocList('Sales Invoice', {
    fields: ['name', 'posting_date', 'status', 'total'],
    limit: 1000,
    orderBy: {
      field: 'posting_date',
      order: 'desc'
    }
  })

  const tabData = [
    {
        title: 'ส่วนลด 5 % สินค้าที่ร่วมรายการ',
        description: '26 ก.พ. 2022',
        coins: "+10",
        image: "",
    }
  ]
  const tabDataRedeemed = [
      {
          title: 'ส่วนลด 5 % สินค้าที่ร่วมรายการ',
          description: '26 ก.พ. 2022',
          coins: "-10",
          image: "",
      }
  ]
  const tabs = [
    { name: 'คะแนนที่ได้รับ', content: tabData },
    { name: 'คะแนนที่ใช้ไป', content: tabDataRedeemed },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const myRewards = [
    {
      title: 'ส่วนลด 5 % สินค้าที่ร่วมรายการ',
      date: '30-08-2023',
      types: ['คูปองออนไลน์'],
      icon: <Percent />
    },
    {
      title: 'ส่วนลด 5 % สินค้าที่ร่วมรายการ',
      date: '30-08-2023',
      types: ['ใช้หน้าร้าน'],
      icon: <ShoppingBag02 color="#F0592A"/>
    },
    {
      title: 'ส่วนลด 5 % สินค้าที่ร่วมรายการ',
      date: '30-08-2023',
      types: ['คูปองออนไลน์', 'Test'],
      icon: <Percent />
    }
  ]

  const usedRewards = [
    {
      title: 'ส่วนลด 5 % สินค้าที่ร่วมรายการ',
      date: '30-08-2023',
      types: ['คูปองออนไลน์'],
      icon: <Percent color="#8A8A8A"/>
    },
    {
      title: 'ส่วนลด 5 % สินค้าที่ร่วมรายการ',
      date: '30-08-2023',
      types: ['ใช้หน้าร้าน'],
      icon: <ShoppingBag02 color="#8A8A8A"/>
    },
    {
      title: 'ส่วนลด 5 % สินค้าที่ร่วมรายการ',
      date: '30-08-2023',
      types: ['คูปองออนไลน์', 'Test'],
      icon: <Percent color="#8A8A8A"/>
    }
  ]

  const [status, setStatus] = useState()
  return (
    <>
      <div className="fixed w-full top-0">
        <header className='p-[14px] border-b border-b-[#F2F2F2] flex gap-x-[7px] text-md font-bold bg-white top-0 bg-white z-[999]'>
          <Link to="/reward-history">
            <span className="sr-only">Close panel</span>
            <ArrowLeft />
          </Link>
          รางวัลของฉัน
        </header>
        <nav className="isolate flex divide-x shadow-[none] shadow border-b" aria-label="Tabs">
            {tabs.map((tab, tabIdx) => (
                <a
                    key={tab.name}
                    href={tab.href}
                    className={classNames(
                        currentTab === tab.name ? 'text-gray-900' : 'text-[#8A8A8A]',
                        tabIdx === 0 ? '' : '',
                        tabIdx === tabs.length - 1 ? '' : '',
                        'group relative min-w-0 flex-1 overflow-hidden bg-white border-none py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                    )}
                    aria-current={currentTab === tab.name ? 'page' : undefined}
                    onClick={() => setCurrentTab(tab.name)}
                >
                    <span>{tab.name}</span>
                    <span
                        aria-hidden="true"
                        className={classNames(
                            currentTab === tab.name ? 'bg-[#111111]' : 'bg-transparent',
                            'absolute inset-x-0 bottom-0 h-0.5 text-[#111111]'
                        )}
                    />
                </a>
            ))}
        </nav>
      </div>
      <main className="flex flex-col gap-y-[18px] mt-[123px]">
        {/* {data && (
          <>
            {data.map((d) => 
            <Link to={`/my-order-details/${d.name}`}>
              <section className="flex gap-x-[14px] mt-[14px] pb-[18px] border-b border-b-[#E3E3E3]">
                {/* <div>
                  <img src={testImg} />
                </div>
                <div className="flex w-full flex-col gap-y-3">
                  <div className="flex">
                    <h2 className="w-[40%] text-xs">คำสั่งซื้อ</h2>
                    <p className="w-[60%] text-xs text-[#F0592A]">{d.name}</p>
                  </div>
                  <div className="flex">
                    <h2 className="w-[40%] text-xs">วันที่</h2>
                    <p className="w-[60%] text-xs">{d.posting_date}</p>
                  </div>
                  <div className="w-full">
                    <Link to={`/my-order-details/${d.name}`} className='w-full block text-white rounded-[9px] p-3 text-center' style={{background:"linear-gradient(133.91deg, #F16A28 1.84%, #F9A30F 100%)"}}>ดูข้อมูล</Link>
                  </div>
                </div>
              </section>
            </Link>
            )}
          </>
        )} */}
          {tabs.map((tab) => (
            <div key={tab.name} className={currentTab === tab.name ? 'space-y-[18px]' : 'hidden'}>
                {tab.name == 'คะแนนที่ได้รับ' ?
                  <>
                    {myRewards.map((reward) => 
                    <div className="border-b border-[#E3E3E3]" key={reward.title}>
                      <div className="flex justify-between items-center pb-[18px] px-[18px]">
                        <div className="flex items-center">
                            <div>{reward.icon}</div>
                            <div className="ml-[43px]">
                              <div className="flex gap-x-2">
                                {reward.types.map((type) => 
                                  <p className='bg-[#FDF0E4] inline-block h-[19px] rounded-full px-[10px] py-[4px] text-[#F0592A] font-bold text-[10px] leading-[11.1px]'>{type}</p>
                                )}
                              </div>
                              <p className="mt-[6px] font-bold text-xs text-[#000000] leading-[14px]" style={{ fontFamily: "Eventpop" }}>{reward.title}</p>
                              <p className="mt-[6px] font-bold text-xs text-[#00000061] leading-[14px]" style={{ fontFamily: "Eventpop" }}>ใช้ได้จนถึง {reward.date}</p>
                            </div>
                        </div>
                        <div>
                          <button className="font-bold text-[#F0592A] text-xs leading-[14px]" style={{ fontFamily: "Eventpop" }}>ใช้เลย</button>
                        </div>
                      </div>
                    </div>
                    )}
                  </>
                    :
                    <>
                    {usedRewards.map((reward) => 
                    <div className="border-b border-[#E3E3E3]" key={reward.title}>
                      <div className="flex justify-between items-center pb-[18px] px-[18px]">
                        <div className="flex items-center">
                            <div>{reward.icon}</div>
                            <div className="ml-[43px]">
                              <div className="flex gap-x-2">
                                {reward.types.map((type) => 
                                  <p className='bg-[#F0F0F0] inline-block h-[19px] rounded-full px-[10px] py-[4px] text-[#8A8A8A] font-bold text-[10px] leading-[11.1px]'>{type}</p>
                                )}
                              </div>
                              <p className="mt-[6px] font-bold text-xs text-[#000000] leading-[14px]" style={{ fontFamily: "Eventpop" }}>{reward.title}</p>
                              <p className="mt-[6px] font-bold text-xs text-[#00000061] leading-[14px]" style={{ fontFamily: "Eventpop" }}>ใช้ได้จนถึง {reward.date}</p>
                            </div>
                        </div>
                        <div>
                          <button className="font-bold text-[#8A8A8A] text-xs leading-[14px]" style={{ fontFamily: "Eventpop" }}>ใช้เลย</button>
                        </div>
                      </div>
                    </div>
                    )}
                  </>
                }
            </div>
            ))}

      </main>
    </>
  )
}

export default MyOrder