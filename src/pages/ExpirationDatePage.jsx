import React, { useState, useMemo, useEffect } from 'react'
import TitleHeader from '../components/TitleHeader'
import coinHand from '../img/coins-hand.svg'
import spentCoins from '../img/spentCoins.svg'
import { Link } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { useFrappeGetCall, useFrappeGetDoc } from 'frappe-react-sdk';
import FooterMenu from '../components/FooterMenu';
import Skeleton from '../components/Skeleton';

export default function ExpirationDatePage() {
    const { user } = useUser()
    const { data } = useFrappeGetCall('headless_e_commerce.api.get_loyalty_points_details');
    const [loading, setLoading] = useState(true)

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

    const entryDistribution = useMemo(() => {
        return data?.message.record.reduce((acc, record) => {
            if (record.loyalty_points > 0) {
                acc.entries.push(record)
            } else {
                if (record.loyalty_points < 0) {
                    acc.exits.push(record)
                }
            }
            return acc;
        }, {
            entries: [],
            exits: []
        })
    }, [data])

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000)
        console.log('Entry:' + entryDistribution?.entries)

        console.log('Data: ' + data)

        console.log('User: ' + user)
    }, [entryDistribution, data, user])

    return (
        <>
            <TitleHeader link='/my-account' title='คะแนนใกล้หมดอายุ' />

            <div className='mt-[53px] fixed w-full top-0'>
                <div className='bg-[#FDF0E4] flex justify-between p-[18px] items-center'>
                    <div className=''>
                        <div className='flex items-center'>
                            <h4 className='font-bold text-[#F0592A] text-[26px] mr-[7px]'>{user?.loyalty_points}</h4>
                            <p className='font-normal font-xs text-[17px] text-[#F0592A] bg-none'>คะแนนที่ใช้ได้</p>
                        </div>
                    </div>
                    <div>
                        <Link to='/categories' className='bg-[#F0592A] text-sm font-bold px-[6px] py-[4px] font-sm rounded-md  text-white leading-[20.3px]'>แลกคะแนน</Link>
                    </div>
                </div>
            </div>

            <div className={`mt-[125px]`}>
                {!loading ? (
                    <div className='space-y-[18px]'>
                      {entryDistribution?.entries.map((entry) => (
                        <div className="border-b border-[#E3E3E3]" key={entry.name}>
                          <div className="flex justify-between items-center pb-[18px] px-[18px]">
                            <div className="flex items-center">
                              <div><img src={coinHand} className="w-[22px] h-[22px] ml-[27px]" alt="" /></div>
                              <div className="ml-[43px]">
                                <p className="mt-[6px] font-bold text-xs text-[#000000] leading-[14px]" style={{ fontFamily: "Eventpop" }}>คุณได้รับคะแนน</p>
                              </div>
                            </div>
                            <div>
                              <button className="font-bold text-[#F0592A] text-xs leading-[14px]" style={{ fontFamily: "Eventpop" }}>+{entry.loyalty_points} คะแนน</button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                    <div>
                      <div className='pb-[18px] px-5 pt-[37px] border-b border-b-[#E3E3E3]'>
                        <Skeleton width='100%' height='21px' borderRadius='4px'/>
                      </div>
                      <div className='pb-[18px] px-5 pt-[37px] border-b border-b-[#E3E3E3]'>
                        <Skeleton width='100%' height='21px' borderRadius='4px'/>
                      </div>
                      <div className='pb-[18px] px-5 pt-[37px] border-b border-b-[#E3E3E3]'>
                        <Skeleton width='100%' height='21px' borderRadius='4px'/>
                      </div>
                      <div className='pb-[18px] px-5 pt-[37px] border-b border-b-[#E3E3E3]'>
                        <Skeleton width='100%' height='21px' borderRadius='4px'/>
                      </div>
                    </div>
                )}
            </div>
            <FooterMenu active={2} />
        </>
    )
}