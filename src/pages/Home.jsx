import React, { useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import PromotionCard from '../components/PromotionCard';
import { useProducts } from '../hooks/useProducts'
import { useFrappeAuth, useFrappeGetDoc } from 'frappe-react-sdk';
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
import { ChevronRight } from '@untitled-ui/icons-react';

const Home = () => {
    const { currentUser, updateCurrentUser } = useFrappeAuth();
    const { products } = useProducts()

    useEffect(() => {
        updateCurrentUser()
    }, [updateCurrentUser])

    const { data, isLoading, error } = useFrappeGetDoc('User', currentUser, {
      filters: ['name', 'full_name', 'user_image']
    })

    return (
        <>
          <NavHeader />
            <header className="py-6 px-5 w-full">
              {data && (
                <div className='flex'>
                  <div className='flex items-center w-1/2'>
                    <img src={data.user_image} width="64" className='rounded-[99px]'/>
                    <div className='ml-3 flex flex-col'>
                      <span className='font-bold'>{data.full_name}</span>
                    </div>
                  </div>
                  <div className='flex flex-col items-end justify-center w-1/2'>
                    <div className='inter text-xs text-[#4C4B4F]'>
                      Coins
                    </div>
                    <div className='flex gap-x-1 text-[13px]'>
                      <img src={coin}/>
                      230
                    </div>
                  </div>
                </div>
              )}
              {isLoading || error && (
                <>
                  <div className='flex items-center w-1/2'>
                    <svg className="h-[64px] w-[64px] bg-white text-gray-300 rounded-[99px]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <div className='ml-3 flex flex-col'>
                      <span className='font-bold'>Loading...</span>
                    </div>
                  </div>
                  <div className='flex items-center w-1/2'>
                    <svg className="h-[64px] w-[64px] bg-white text-gray-300 rounded-[99px]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <div className='ml-3 flex flex-col'>
                      <span className='font-bold'>Loading...</span>
                    </div>
                  </div>
                </>
              )}
            </header>
            {/* <img src={banner} className='w-full left-0 max-h-[240px] object-cover'/> */}
            <div className='w-full bg-[#ADB1BB] pt-[160px] p-5 flex justify-between items-center'>
              <div>
                <h2>Silver</h2>
                <p>อีก 11 คะแนนเลื่อนเป็น Gold</p>
              </div>
              <div>
                <button>รางวัลของฉัน</button>
              </div>
            </div>
            
            <button style={{background:"green"}} className='p-4 w-full'>วิธีเก็บคะแนน</button>

            <main className='relative top-[-10px] pb-[94px]'>

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