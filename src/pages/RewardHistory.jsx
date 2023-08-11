import React, { useState } from 'react'
import TitleHeader from '../components/TitleHeader'
import coinHand from '../img/coins-hand.svg'
import spentCoins from '../img/spentCoins.png'

function RewardHistory() {
    const [currentTab, setCurrentTab] = useState('คะแนนที่ได้รับ');
    const tabData = [
        {
            title: 'ส่วนลด 5 % สินค้าที่ร่วมรายการ',
            description: '26 ก.พ. 2022',
            coins: "+10",
            image: coinHand,
        }
    ]
    const tabDataRedeemed = [
        {
            title: 'ส่วนลด 5 % สินค้าที่ร่วมรายการ',
            description: '26 ก.พ. 2022',
            coins: "-10",
            image: coinHand,
        }
    ]
    const tabs = [
        { name: 'คะแนนที่ได้รับ', content: tabData },
        { name: 'คะแนนที่ใช้ไป', content: tabDataRedeemed },
    ];

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    return (
        <>
            <TitleHeader link='/' title='ประวัติการใช้งานคะแนน' />

            <div className='bg-[#FDF0E4] flex justify-between p-[18px] items-center'>
                <div className=''>
                    <div className='flex items-end'>
                        <h4 className='font-bold text-[#F0592A] text-[26px] mr-[7px]'>50</h4>
                        <p className='font-normal font-xs text-[17px] text-[#F0592A] bg-none'>คะแนนที่ใช้ได้</p>
                    </div>
                    <p className='font-normal text-[#424242] text-xs leading-[17.4px]'>21 คะแนนจะหมดอายุ 31 ม.ค. 2024 </p>
                </div>
                <div>
                    <button className='bg-[#F0592A] text-sm font-bold px-[6px] py-[4px] font-sm rounded-md  text-white leading-[20.3px]'>รางวัลของฉัน</button>
                </div>
            </div>

            <div>
                <div className="">
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
                <div className="mt-6">
                    {tabs.map((tab) => (
                        <div key={tab.name} className={currentTab === tab.name ? 'space-y-[18px]' : 'hidden'}>
                            {tab.name == 'คะแนนที่ได้รับ' ?
                                <div className="border-b border-[#E3E3E3]">
                                    <div className="flex justify-between items-end pb-[18px] px-[18px]">
                                        <div className="flex items-center">
                                            <div><img src={coinHand} className="w-[22px] h-[22px] ml-[27px]" alt="" /></div>
                                            <div className="ml-[43px]">
                                                <p className="mt-[6px] font-bold text-xs text-[#111111] leading-[14px]" style={{ fontFamily: "Eventpop" }}>ส่วนลด 5 % สินค้าที่ร่วมรายการ</p>
                                                <p className="mt-[9px] font-normal text-[10px] text-[#00000061] leading-[14.5px]" style={{ fontFamily: "Eventpop" }}>26 ก.พ. 2022</p>
                                            </div>
                                        </div>
                                        <div>
                                            <button className="font-bold text-[#F0592A] text-xs leading-[14px]" style={{ fontFamily: "Eventpop" }}>+10</button>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="border-b border-[#E3E3E3]">
                                    <div className="flex justify-between items-end pb-[18px] px-[18px]">
                                        <div className="flex items-center">
                                            <div><img src={spentCoins} className="w-[22px] h-[22px] ml-[27px] opacity-[50%]" alt="" /></div>
                                            <div className="ml-[43px]">
                                                <p className="mt-[6px] font-bold text-xs text-[#111111] leading-[14px]" style={{ fontFamily: "Eventpop" }}>แลกของรางวัล</p>
                                                <p className="mt-[9px] font-normal text-[10px] text-[#00000061] leading-[14.5px]" style={{ fontFamily: "Eventpop" }}>26 ก.พ. 2022</p>
                                            </div>
                                        </div>
                                        <div>
                                            <button className="font-bold text-[#8A8A8A] text-xs leading-[14px]" style={{ fontFamily: "Eventpop" }}>-20</button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default RewardHistory
