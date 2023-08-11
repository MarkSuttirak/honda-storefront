import React, { useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import PromotionCard from '../components/PromotionCard';
import { useProducts } from '../hooks/useProducts'
import { useFrappeAuth } from 'frappe-react-sdk';
import banner from '../img/banner.png'
import coin from '../img/coin.svg'
import coupon from '../img/coupon.svg'
import { SfIconSearch, SfIconArrowForward, SfIconCalendarToday } from '@storefront-ui/react'
import { Link } from "react-router-dom"
import activity1 from '../img/activity1.svg'
import activity2 from '../img/activity2.svg'
import activity3 from '../img/activity3.svg'
import activity4 from '../img/activity4.svg'
import activity5 from '../img/activity5.svg'
import activity6 from '../img/activity6.svg'
import activity7 from '../img/activity7.svg'
import activity8 from '../img/activity8.svg'
import discountfive from '../img/discountfive.png'
import promotion1 from '../img/promotion1.png'
import promotion2 from '../img/promotion2.png'
import bannerDiscount1 from '../img/banner-discount1.png'
import bannerDiscount2 from '../img/banner-discount2.png'
import BlogCard from '../components/BlogCard';
import NavHeader from '../components/NavHeader'
import FooterMenu from '../components/FooterMenu';

const Home = () => {
    const { updateCurrentUser } = useFrappeAuth();
    const { products } = useProducts()

    useEffect(() => {
        updateCurrentUser()
    }, [updateCurrentUser])

    return (
        <>
          <NavHeader />
            <img src={banner} className='w-full left-0 max-h-[240px] object-cover'/>
            <header className='m-3 bg-white relative pl-5 py-1 m-auto rounded-[6px] top-[-30px] flex' style={{filter:"drop-shadow(0 4px 20px #6363630D)",width:"calc(100% - 40px)"}}>
              <div className='w-[80%] py-2'>
                <div className='flex'>
                  <div className='basis-1/3 flex gap-x-1 text-[13px]'>
                    <span className='text-[#1BB040]'>฿ </span>
                    850
                  </div>
                  <div className='basis-1/3 flex gap-x-1 text-[13px]'>
                    <img src={coin}/>
                    230
                  </div>
                  <div className='basis-1/3 flex gap-x-1 text-[13px]'>
                    <img src={coupon}/>
                    8
                  </div>
                </div>

                <div className='flex mt-[2px]'>
                  <div className='basis-1/3 inter text-xs text-[#4C4B4F]'>
                    <Link to="/my-account">Wallet</Link>
                  </div>
                  <div className='basis-1/3 inter text-xs text-[#4C4B4F]'>
                    Coins
                  </div>
                  <div className='basis-1/3 inter text-xs text-[#4C4B4F]'>
                    <Link to="/my-coupon">Coupon</Link>
                  </div>
                </div>
              </div>

              <div className='border-l border-l-[#E8E8E8] w-[20%]'>
                <div className='h-full flex items-center justify-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#8A8A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </header>
            <main className='relative top-[-10px] pb-[94px]'>
              <div className='flex gap-2 px-5'>
                <picture className='basis-1/4 flex flex-col justify-start text-center'>
                  <img src={activity1} className='w-fit mx-auto'/>
                  <p className='text-xs text-[#1C1C1C] mt-3'>Offer ส่วนลด</p>
                </picture>
                <picture className='basis-1/4 flex flex-col justify-start text-center'>
                  <img src={activity2} className='w-fit mx-auto' />
                  <p className='text-xs text-[#1C1C1C] mt-3'>โปรโมชั่น <br/>50 %</p>
                </picture>
                <picture className='basis-1/4 flex flex-col justify-start text-center'>
                  <img src={activity3} className='w-fit mx-auto'/>
                  <p className='text-xs text-[#1C1C1C] mt-3'>Boxing Day <br/>ขายยกลัง</p>
                </picture>
                <picture className='basis-1/4 flex flex-col justify-start text-center'>
                  <img src={activity4} className='w-fit mx-auto' />
                  <p className='text-xs text-[#1C1C1C] mt-3'>โปรสุดคุ้ม <br/>Mege Sale</p>
                </picture>
              </div>
              <div className='flex gap-2 mt-[26px] px-5'>
                <picture className='basis-1/4 flex flex-col justify-start text-center'>
                  <img src={activity5} className='w-fit mx-auto'/>
                  <p className='text-xs text-[#1C1C1C] mt-3'>ใส่ CYBER ลด <br/>100 บ.</p>
                </picture>
                <picture className='basis-1/4 flex flex-col justify-start text-center'>
                  <img src={activity6} className='w-fit mx-auto' />
                  <p className='text-xs text-[#1C1C1C] mt-3'>ยินดีต้อนรับ <br/>กลับมา</p>
                </picture>
                <picture className='basis-1/4 flex flex-col justify-start text-center'>
                  <img src={activity7} className='w-fit mx-auto'/>
                  <p className='text-xs text-[#1C1C1C] mt-3'>ลดสูงสุด <br/>60 %</p>
                </picture>
                <picture className='basis-1/4 flex flex-col justify-start text-center'>
                  <img src={activity8} className='w-fit mx-auto' />
                  <p className='text-xs text-[#1C1C1C] mt-3'>อื่นๆ</p>
                </picture>
              </div>

              <h2 className='mt-[30px] px-5 inter font-semibold text-[#3D3D3D]'>Celebrate Mid Year Festival</h2>
              
              <div className='mt-3 flex overflow-x-scroll gap-x-6 px-5'>
                <PromotionCard link="/checkout" title="ของขวัญแสนพิเศษในวันที่แสนพิเศษ รับทันที ส่วนลด 50 % สำหรับเดือนเกิด" image={discountfive} date="อายุการใช้งาน 1 เดือนหลังจากได้รับคูปอง" />
                <PromotionCard link="/checkout" title="ของขวัญแสนพิเศษในวันที่แสนพิเศษ รับทันที ส่วนลด 50 % สำหรับเดือนเกิด" image={discountfive} date="อายุการใช้งาน 1 เดือนหลังจากได้รับคูปอง" />
              </div>

              <div className='flex flex-col gap-y-[11px] mt-[30px] px-5'>
                <img src={promotion1} />
                <img src={promotion2} />
              </div>

              <div className='mt-[22px]'>
                <h2 className='text-[#3D3D3D] font-bold flex items-center px-5 mb-[14px] leading-6'>
                  สินค้าลดราคา
                  <SfIconArrowForward className="w-[18px] text-black ml-2"/>
                </h2>

                <div className="flex overflow-x-auto gap-x-[14px] mx-auto px-5">
                  {(products ?? []).map((product) => (
                    <ProductCard
                      key={product.item_code}
                      title={product.name}
                      productId={product.name}
                      itemCode={product.item_code}
                      price={product.formatted_price}
                      thumbnail={product.website_image ? product.website_image : "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png"} />
                  ))}
                </div>
              </div>

              <div className='mt-[22px]'>
                <h2 className='text-[#3D3D3D] font-bold flex items-center px-5 mb-[14px] leading-6'>
                  สินค้าลดราคา
                  <SfIconArrowForward className="w-[18px] text-black ml-2"/>
                </h2>

                <div className="flex overflow-x-auto gap-x-[14px] mx-auto px-5">
                  {(products ?? []).map((product) => (
                    <ProductCard
                      key={product.item_code}
                      title={product.name}
                      productId={product.name}
                      itemCode={product.item_code}
                      price={product.formatted_price}
                      thumbnail={product.website_image ? product.website_image : "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png"} />
                  ))}
                </div>
              </div>

              <div className='mt-[22px]'>
                <h2 className='text-[#3D3D3D] font-bold flex items-center px-5 mb-[14px] leading-6'>
                  สินค้าลดราคา
                  <SfIconArrowForward className="w-[18px] text-black ml-2"/>
                </h2>

                <div className="flex overflow-x-auto gap-x-[14px] mx-auto px-5">
                  {(products ?? []).map((product) => (
                    <ProductCard
                      key={product.item_code}
                      title={product.name}
                      productId={product.name}
                      itemCode={product.item_code}
                      price={product.formatted_price}
                      thumbnail={product.website_image ? product.website_image : "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png"} />
                  ))}
                </div>
              </div>

              <div className="mt-[30px]">
                <h2 className='text-[#3D3D3D] font-bold flex items-center px-5 mb-[14px] leading-6'>
                  สินค้าลดราคา
                  <SfIconArrowForward className="w-[18px] text-black ml-2"/>
                </h2>

                <div className="flex overflow-x-auto gap-x-[14px] mx-auto px-5">
                  <BlogCard image={bannerDiscount1} title="รวมคูปองและโค้ดส่วนลดประจำเดือนสิงหาคม 2023" date="12 ธ.ค. 2023" />
                  <BlogCard image={bannerDiscount2} title="รวมคูปองและโค้ดส่วนลดประจำเดือนสิงหาคม 2023" date="12 ธ.ค. 2023" />
                </div>
              </div>
            </main>
            <FooterMenu active={0}/>
        </>
    )
}

export default Home