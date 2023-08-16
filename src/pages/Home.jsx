import React, { useEffect, useState } from 'react'
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
import hondaLogo from '../img/hondaLogo.png'
import discountfive from '../img/discountfive.png'
import promotion1 from '../img/promotion1.png'
import promotion2 from '../img/promotion2.png'
import bannerDiscount1 from '../img/banner-discount1.png'
import bannerDiscount2 from '../img/banner-discount2.png'
import BlogCard from '../components/BlogCard';
import NavHeader from '../components/NavHeader'
import FooterMenu from '../components/FooterMenu';
import { ChevronRight } from '@untitled-ui/icons-react';
import { useUser } from '../hooks/useUser';
import iconRightHead from "../img/iconRightHead.svg"
import bookClosed from "../img/book-closed.svg"
import giftIcon from "../img/goftIconOrange.svg"
import blogBanner from "../img/blog-img.png"
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/skeleton';

const Home = () => {
  document.body.style.background = "white"
  const { currentUser, updateCurrentUser } = useFrappeAuth();
  const { user } = useUser()
  const { products } = useProducts()

  const [loading, setLoading] = useState(true);

  const { data, isLoading, error } = useFrappeGetDoc('User', currentUser, {
    filters: ['name', 'full_name', 'user_image']
  })
  useEffect(() => {
    updateCurrentUser()
    .then(() => {
      if (products){
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }
    })
  },[])

  return (
    <>
      <NavHeader />
      <header className="pt-6 px-5 w-full">
        {data && (
          <div className='flex'>
            <div className='flex items-center w-[85%]'>
              {data.user_image ? (
                <img src={data.user_image} width="64" className='rounded-[99px]' />
              ) : (
                <SkeletonCircle startColor='#EDF2F7' endColor='#EDF2F7' width='64px' height='64px' borderRadius='100%'/>
              )}
              <div className='ml-3 flex flex-col'>
                <span className='font-bold'>{data.full_name}</span>
              </div>
            </div>
            <div className='flex flex-col items-end justify-center w-[15%]'>
              <div className='inter text-xs text-[#4C4B4F]'>
                Coins
              </div>
              <div className='flex gap-x-1 text-[13px]'>
                <img src={coin} />
                <span className='text-2xl font-semibold'>{user?.loyalty_points}</span>
              </div>
            </div>
          </div>
        )}
        {isLoading && loading && (
          <div className='flex'>
            <div className='flex items-center w-[85%]'>
              <SkeletonCircle startColor='#EDF2F7' endColor='#A0AEC0' width='64px' height='64px' borderRadius='100%'/>
              <Skeleton startColor='#EDF2F7' endColor='#A0AEC0' width='150px' height='20px' marginLeft='12px'/>
            </div>
            <div className='flex flex-col items-end justify-end w-[15%]'>
              <div className='inter text-xs text-[#4C4B4F]'>
                Loading...
              </div>
              <div className='flex gap-x-1 text-[13px]'>
                <img src={coin} />
                <span className='text-2xl font-semibold'>{user?.loyalty_points}</span>
              </div>
            </div>
          </div>
        )}
      </header>
      {/* <img src={banner} className='w-full left-0 max-h-[240px] object-cover'/> */}

      <div className='bg-[#ADB1BB] pt-[160px] p-5 pb-[15px] px-[12px] flex justify-between items-end mx-[auto] rounded-[10px] theMainBannerReardHome'>
        <div>
          <h2 className='text-[32px] text-white'>Silver</h2>
        </div>
        <div className=''>
          <button className='bg-white w-[140px] h-[40px] rounded-full flex items-center justify-center' style={{ boxShadow: "0px 3px 15px 0px #7777771A" }}>
            <img src={giftIcon} alt="" />
            <p className='font-normal text-sm leading-[21px] text-[#F0592A] ml-1'>รางวัลของฉัน</p>
          </button>
        </div>
      </div>

      {/* <div className="w-[354px] mx-[auto] mt-[32px]">

              <button style={{background: "linear-gradient(133.91deg, #F16A28 1.84%, #F9A30F 100%)"}} className='p-4 text-white w-[100%] rounded-lg'>วิธีเก็บคะแนน</button>
            </div> */}

      <div className='flex justify-between items-center my-[32px] mx-5 p-5 h-[54px] rounded-lg' style={{ background: "linear-gradient(133.91deg, #F16A28 1.84%, #F9A30F 100%)",width:"calc(100% - 40px)"}}>
        <div className='flex items-center'>
          <img className='w-[17px] h-[17px]' src={bookClosed} alt="" />
          <p className='font-normal font-sm leading-[20px] ml-2 text-white'>วิธีเก็บคะแนน</p>
        </div>
        <div>
          <img src={iconRightHead} className='w-[6px] h-[10px]' alt="" />
        </div>
      </div>

      <main className='relative top-[-10px] pb-[94px]'>
        <div className='mt-[22px]'>
          <h2 className='text-[#3D3D3D] font-bold flex items-center px-5 mb-[14px] leading-6'>
            สินค้าลดราคา
            <SfIconArrowForward className="w-[18px] text-black ml-2" />
          </h2>

          <div className="flex overflow-x-auto gap-x-[14px] mx-auto px-5">
            {loading ? (
              <>
                <div className='flex flex-col'>
                  <Skeleton height='150px' width='150px' startColor='#EDF2F7' endColor='#A0AEC0' borderRadius='6px'/>
                  <Skeleton height='10px' width='150px' startColor='#EDF2F7' endColor='#A0AEC0' marginTop='16px'/>
                  <Skeleton height='10px' width='50px' startColor='#EDF2F7' endColor='#A0AEC0' marginTop='6px'/>
                </div>
                <div className='flex flex-col'>
                  <Skeleton height='150px' width='150px' startColor='#EDF2F7' endColor='#A0AEC0' borderRadius='6px'/>
                  <Skeleton height='10px' width='150px' startColor='#EDF2F7' endColor='#A0AEC0' marginTop='16px'/>
                  <Skeleton height='10px' width='50px' startColor='#EDF2F7' endColor='#A0AEC0' marginTop='6px'/>
                </div>
                <div className='flex flex-col'>
                  <Skeleton height='150px' width='150px' startColor='#EDF2F7' endColor='#A0AEC0' borderRadius='6px'/>
                  <Skeleton height='10px' width='150px' startColor='#EDF2F7' endColor='#A0AEC0' marginTop='16px'/>
                  <Skeleton height='10px' width='50px' startColor='#EDF2F7' endColor='#A0AEC0' marginTop='6px'/>
                </div>
              </>
            ) : (
              <>
              {(products ?? []).map((product) => (
                <ProductCard
                  key={product.item_code}
                  title={product.item_name}
                  productId={product.name}
                  itemCode={product.item_code}
                  price={product.formatted_price}
                  thumbnail={product.website_image} />
              ))} {/* Original thumbnail "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png" */}
            </>
            )}
          </div>
        </div>

        <div className='mt-[22px]'>
          <h2 className='text-[#3D3D3D] font-bold flex items-center px-5 mb-[14px] leading-6'>
            สินค้าลดราคา
            <SfIconArrowForward className="w-[18px] text-black ml-2" />
          </h2>

          <div className="flex overflow-x-auto gap-x-[14px] mx-auto px-5">
            {loading ? (
              <>
                <div className='flex flex-col'>
                  <Skeleton height='150px' width='150px' startColor='#EDF2F7' endColor='#A0AEC0' borderRadius='6px'/>
                  <Skeleton height='10px' width='150px' startColor='#EDF2F7' endColor='#A0AEC0' marginTop='16px'/>
                  <Skeleton height='10px' width='50px' startColor='#EDF2F7' endColor='#A0AEC0' marginTop='6px'/>
                </div>
                <div className='flex flex-col'>
                  <Skeleton height='150px' width='150px' startColor='#EDF2F7' endColor='#A0AEC0' borderRadius='6px'/>
                  <Skeleton height='10px' width='150px' startColor='#EDF2F7' endColor='#A0AEC0' marginTop='16px'/>
                  <Skeleton height='10px' width='50px' startColor='#EDF2F7' endColor='#A0AEC0' marginTop='6px'/>
                </div>
                <div className='flex flex-col'>
                  <Skeleton height='150px' width='150px' startColor='#EDF2F7' endColor='#A0AEC0' borderRadius='6px'/>
                  <Skeleton height='10px' width='150px' startColor='#EDF2F7' endColor='#A0AEC0' marginTop='16px'/>
                  <Skeleton height='10px' width='50px' startColor='#EDF2F7' endColor='#A0AEC0' marginTop='6px'/>
                </div>
              </>
            ) : (
              <>
              {(products ?? []).map((product) => (
                <ProductCard
                  key={product.item_code}
                  title={product.item_name}
                  productId={product.name}
                  itemCode={product.item_code}
                  price={product.formatted_price}
                  thumbnail={product.website_image} />
              ))} {/* Original thumbnail "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png" */}
            </>
            )}
          </div>
        </div>

        <div className='mt-[22px]'>
          <h2 className='text-[#3D3D3D] font-bold flex items-center px-5 mb-[14px] leading-6'>
            สินค้าลดราคา
            <SfIconArrowForward className="w-[18px] text-black ml-2" />
          </h2>

          <div className="flex overflow-x-auto gap-x-[14px] mx-auto px-5">
            {loading ? (
              <>
                <div className='flex flex-col'>
                  <Skeleton height='150px' width='150px' startColor='#EDF2F7' endColor='#A0AEC0' borderRadius='6px'/>
                  <Skeleton height='10px' width='150px' startColor='#EDF2F7' endColor='#A0AEC0' marginTop='16px'/>
                  <Skeleton height='10px' width='50px' startColor='#EDF2F7' endColor='#A0AEC0' marginTop='6px'/>
                </div>
                <div className='flex flex-col'>
                  <Skeleton height='150px' width='150px' startColor='#EDF2F7' endColor='#A0AEC0' borderRadius='6px'/>
                  <Skeleton height='10px' width='150px' startColor='#EDF2F7' endColor='#A0AEC0' marginTop='16px'/>
                  <Skeleton height='10px' width='50px' startColor='#EDF2F7' endColor='#A0AEC0' marginTop='6px'/>
                </div>
                <div className='flex flex-col'>
                  <Skeleton height='150px' width='150px' startColor='#EDF2F7' endColor='#A0AEC0' borderRadius='6px'/>
                  <Skeleton height='10px' width='150px' startColor='#EDF2F7' endColor='#A0AEC0' marginTop='16px'/>
                  <Skeleton height='10px' width='50px' startColor='#EDF2F7' endColor='#A0AEC0' marginTop='6px'/>
                </div>
              </>
            ) : (
              <>
              {(products ?? []).map((product) => (
                <ProductCard
                  key={product.item_code}
                  title={product.item_name}
                  productId={product.name}
                  itemCode={product.item_code}
                  price={product.formatted_price}
                  thumbnail={product.website_image} />
              ))} {/* Original thumbnail "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png" */}
            </>
            )}
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
        </div>

        <div className="mt-[30px]">
          <h2 className='text-[#3D3D3D] font-bold flex items-center px-5 mb-[14px] leading-6'>
            สินค้าลดราคา
            <SfIconArrowForward className="w-[18px] text-black ml-2"/>
          </h2>

          <div className="flex overflow-x-auto gap-x-[14px] mx-auto px-5 mb-5">
            <BlogCard image={blogBanner} title="รวมคูปองและโค้ดส่วนลดประจำเดือนสิงหาคม 2023" date="12 ธ.ค. 2023" />
            <BlogCard image={blogBanner} title="รวมคูปองและโค้ดส่วนลดประจำเดือนสิงหาคม 2023" date="12 ธ.ค. 2023" />
          </div>
        </div>
      </main>

      <FooterMenu active={0} />
    </>
  )
}

export default Home