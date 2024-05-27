import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useProducts } from '../hooks/useProducts'
import { useFrappeAuth, useFrappeGetDoc, useFrappeGetCall, useFrappeGetDocList } from 'frappe-react-sdk';
import coin from '../img/coin.svg'
import { SfIconArrowForward, SfIconCalendarToday } from '@storefront-ui/react'
import { Link, useNavigate, useParams } from "react-router-dom"
import NavHeader from '../components/NavHeader'
import FooterMenu from '../components/FooterMenu';
import { useUser } from '../hooks/useUser';
import iconRightHead from "../img/iconRightHead.svg"
import bookClosed from "../img/book-closed.svg"
import giftIcon from "../img/goftIconOrange.svg"
// import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/skeleton';
import Skeleton from '../components/Skeleton';
import { userInfoSchema } from '../components/forms/userInfoSchema';
import { getToken, setToken ,setSessionTime,getSessionTime,removeToken} from "../utils/helper";
import ItemSkeleton from '../components/ItemSkeleton';


export default function Home(){
  const { id } = useParams()
  document.body.style.background = "white"
  const [loading, setLoading] = useState(true);
  const [data, setUserdata] = useState(null);

  const { currentUser, updateCurrentUser } = useFrappeAuth();
  const { user } = useUser();
  const { products, userdata } = useProducts();
  const navigate = useNavigate();
  const [profileloading, setProfileloading] = useState(true);

  const isTokenExpired = () => {
    const sessionTime = getSessionTime();
    console.log(sessionTime);
    if (!sessionTime) {
      return true;
    }
    const currentTime = Date.now();
    const expirationTime = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
    return sessionTime && currentTime - sessionTime > expirationTime;
  };

  // Set the length of userdata and products to more than 0 to show the skeletons when they are being loaded.
  useEffect(() => {
    if (userdata) {
      setUserdata(userdata.user);
      setProfileloading(false);
    }
    updateCurrentUser();
    if (products.length > 0) {
      setLoading(false)
    }

  }, [userdata]);

  useEffect(() => {
    console.log(getToken());
    if(getToken()){
      if (isTokenExpired()) {
        removeToken();
        window.location.reload(true);
        navigate("/login/");
      }
    }
    else{
      navigate("/login/");
    }
  },[getToken()]);

  useEffect(() => {
    if (user) {
      userInfoSchema.validate({
        first_name: user.user.full_name.split(" ")[0],
        last_name: user.user.full_name.split(" ").slice(1).join(" "),
        email: user.user.email,
        phone: user.user.phone,
        id_card_number: "00000000",
        birth_date: user.user.birth_date,
      }).catch((err) => {
        console.log("Redrecting back");
        navigate("/fill-info")
      })
    }
  }, [user])

  const { data: dataBlog } = useFrappeGetDocList('Blog Post', {
    fields: ['name', 'meta_title', 'meta_description', 'published_on', 'meta_image','title', 'published'],
    filters: [['published', '=', 1]]
  })

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
                <Skeleton width='64px' height='64px' borderRadius='50%' />
              )}

              <div className='ml-3 flex flex-col'>
                <span className='text-[#333333] text-sm'>สวัสดี</span>
                <span className='font-bold'>{data.full_name}</span>
              </div>
            </div>
            <div className='flex flex-col items-end justify-center w-[15%]'>
              <div className='inter text-xs text-[#4C4B4F]'>
                Points
              </div>
              <div className='flex gap-x-1 text-[13px]'>
                <img src={coin} />
                <span className='text-2xl font-semibold'>{user?.loyalty_points}</span>
              </div>
            </div>
          </div>
        )}
        {profileloading && (
          <div className='flex items-center'>
            <div className='flex items-center w-[85%] gap-3'>
              <Skeleton width='64px' height='64px' borderRadius='50%' />
              <div className='flex flex-col gap-y-1'>
                <Skeleton width='50px' height='15px'/>
                <Skeleton width='150px' height='20px' />
              </div>
            </div>
            <div className='flex flex-col items-end justify-end w-[15%] gap-1'>
              <Skeleton width='36px' height='15px'/>
              <Skeleton width='50px' height='20px'/>
            </div>
          </div>
        )}
      </header>
      {/* <img src={banner} className='w-full left-0 max-h-[240px] object-cover'/> */}

      <div className={`${profileloading ? 'shadow-main' : ''} pt-[160px] p-5 pb-[15px] px-[12px] flex justify-between items-end mx-[auto] rounded-[10px] theMainBannerReardHome`} style={{ backgroundImage: `url(https://hondanont.zaviago.com${user?.tier?.tier_thumbnail})` }}>
        {profileloading ? (
          <div className='flex justify-between items-end w-full'>
            <Skeleton width='100px' height='39px'/>
            <Skeleton width='140px' height='39px' borderRadius='9999px'/>
          </div>
        ) : (
          <>
            <div>
              <h2 className='text-[32px] text-white'>{user?.tier?.tier_name}</h2>
            </div>
            <div className=''>
              <Link to='/my-order' className='bg-white w-[140px] h-[40px] rounded-full flex items-center justify-center' style={{ boxShadow: "0px 3px 15px 0px #7777771A" }}>
                <img src={giftIcon} alt="" />
                <p className='font-normal text-sm leading-[21px] text-[#F0592A] ml-1'>รางวัลของฉัน</p>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* <div className="w-[354px] mx-[auto] mt-[32px]">
        <button style={{background: "linear-gradient(133.91deg, #F16A28 1.84%, #F9A30F 100%)"}} className='p-4 text-white w-[100%] rounded-lg'>วิธีเก็บคะแนน</button>
      </div> */}

      {!loading ? (
        <Link to='/collect-points' state={{ url: "/" }} className='flex justify-between items-center my-8 mx-5 p-5 h-[54px] rounded-lg' style={{ background: "linear-gradient(133.91deg, #F16A28 1.84%, #F9A30F 100%)", width: "calc(100% - 40px)" }}>
        <div className='flex items-center'>
          <img className='w-[17px] h-[17px]' src={bookClosed} alt="" />
          <p className='font-normal font-sm leading-[20px] ml-2 text-white'>วิธีเก็บคะแนน</p>
        </div>
        <div>
          <img src={iconRightHead} className='w-[6px] h-[10px]' alt="" />
        </div>
      </Link>
      ) : (
        <div className='px-5 my-8'>
          <Skeleton width="100%" height="55px"/>
        </div>
      )}

      <main className='relative top-[-10px] pb-[94px]'>
        <div className='mt-[27px]'>
          {!loading ? (
            <h2 className='text-[#3D3D3D] font-bold flex items-center px-5 mb-[14px] leading-6'>
              ของรางวัลทั้งหมด
              <SfIconArrowForward className="w-[18px] text-black ml-2" />
            </h2>
          ) : (
            <div className='px-5 pb-4'>
              <Skeleton width="172px" height='21px' />
            </div>
          )}

          <div className="flex overflow-x-auto gap-x-[14px] mx-auto px-5">
            {loading ? (
              <>
                <ItemSkeleton />
                <ItemSkeleton />
                <ItemSkeleton />
              </>
            ) : (
              <>
                {(products ?? []).map((product) => (
                  <ProductCard
                    key={product.item_code}
                    title={product.item_name}
                    productId={product.name}
                    itemCode={product.item_code}
                    price={product.loyalty_points_based_price}
                    tags={product.tags}
                    dispalytags='All'
                    thumbnail={product.website_image} />
                ))} {/* Original thumbnail "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/sneakers.png" */}
              </>
            )}
          </div>
        </div>

        <div className='mt-[40px]'>
          {!loading ? 
          <h2 className='text-[#3D3D3D] font-bold flex items-center px-5 mb-[14px] leading-6'>
            ของรางวัล
            <SfIconArrowForward className="w-[18px] text-black ml-2" />
          </h2> : <div className='px-5 pb-4'>
              <Skeleton width="172px" height='21px' />
            </div>}

          <div className="flex overflow-x-auto gap-x-[14px] mx-auto px-5">
            {loading ? (
              <>
                <ItemSkeleton />
                <ItemSkeleton />
                <ItemSkeleton />
              </>
            ) : (
              <>
                {(products ?? []).map((product) => (
                  <ProductCard
                    key={product.item_code}
                    title={product.item_name}
                    productId={product.name}
                    itemCode={product.item_code}
                    price={product.loyalty_points_based_price}
                    tags={product.tags}
                    dispalytags='Gift'
                    thumbnail={product.website_image} />
                ))}
              </>
            )}
          </div>
        </div>

        <div className='mt-[40px]'>
          {!loading ? <h2 className='text-[#3D3D3D] font-bold flex items-center px-5 mb-[14px] leading-6'>
            คูปองแทนเงินสด
            <SfIconArrowForward className="w-[18px] text-black ml-2" />
          </h2> : <div className='px-5 pb-4'>
              <Skeleton width="172px" height='21px' />
            </div>}

          <div className="flex overflow-x-auto gap-x-[14px] mx-auto px-5">
            {loading ? (
              <>
                <ItemSkeleton />
                <ItemSkeleton />
                <ItemSkeleton />
              </>
            ) : (
              <>
                {(products ?? []).map((product) => (
                  <ProductCard
                    key={product.item_code}
                    title={product.item_name}
                    productId={product.name}
                    itemCode={product.item_code}
                    price={product.loyalty_points_based_price}
                    tags={product.tags}
                    dispalytags='Gift Card'
                    thumbnail={product.website_image} />
                ))}
              </>
            )}
          </div>
        </div>

        <div className="mt-[40px]">
          {dataBlog && dataBlog.length > 0? (
            <h2 className='text-[#3D3D3D] font-bold flex items-center px-5 mb-[10px] leading-6'>
              สิทธิประโยชน์สุดพิเศษ
            </h2>
          ) : null}

          <div className="flex overflow-x-auto gap-x-[14px] mx-auto px-5 mb-5">
            <>
              {(dataBlog ?? []).map((d) =>
              (<Link to={`/single-blog/${d.name}`} className="min-w-[300px] max-w-[300px]">
                <h2 className='text-[#3D3D3D] font-bold flex items-center mb-[5px] leading-6'>
                  เข้าร่วมเลย
                  <SfIconArrowForward className="w-[18px] text-black ml-2" />
                </h2>
                <img src={`https://hondanont.zaviago.com/${d.meta_image}`} className="rounded-[6px]" />
                <h2 className='mt-4 whitespace-normal text-[#1C1C1C] text-sm font-bold pr-7'>{d.title}</h2>

                {d.published_on !== " " && (
                  <p className='text-[#8A8A8A] mt-[5px] text-xs flex items-center'>
                    <SfIconCalendarToday className="w-[11px] mr-[6px]" />
                    {d.published_on}
                  </p>
                )}
              </Link>)
              )}
            </>
          </div>
        </div>
      </main>
      <FooterMenu active={0} />
    </>
  )
}