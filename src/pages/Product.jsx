import { useCounter } from 'react-use';
import { clamp } from '@storefront-ui/shared';
import { React, useState, useContext, useEffect } from 'react';
import {
    SfButton,
    SfLink,
    SfIconShoppingCart,
    SfIconSell,
    SfIconPackage,
    SfIconRemove,
    SfIconAdd,
    SfIconWarehouse,
    SfIconSafetyCheck,
    SfIconShoppingCartCheckout,
    SfIconFavorite,
    SfIconArrowForward,
    SfScrollable
} from '@storefront-ui/react';
import { Link, useParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { ArrowLeft, ShoppingBag01, Heart, CoinsStacked01, Truck01, AnnotationDots, Share04, SwitchHorizontal01 } from '@untitled-ui/icons-react';
import Accordion from '../components/Accordion';
import ProductCard from '../components/ProductCard';

const Product = () => {
    const { id } = useParams();
    const { get, products } = useProducts();
    const { cart, addToCart, cartCount, setIsOpen } = useCart();
    const product = get(id);
    const inputId = "useId('input')";
    const min = 1;
    const max = 999;
    const [value, { inc, dec, set }] = useCounter(min);
    const [colour, setColour] = useState("ส้ม")

    const [liked, setLiked] = useState(false)

    const items = [
      {
        title: "ตารางขนาด",
        content: (
        <>
          {/* <div className="flex">
            <SfIconPackage size="sm" className="flex-shrink-0 mr-1 text-neutral-500" />
            <p className="text-sm">
              Free shipping, arrives by Thu, Apr 7. Want it faster?
              <SfLink href="#" variant="secondary" className="mx-1">
                Add an address
              </SfLink>
              to see options
            </p>
          </div>
          <div className="flex mt-4">
            <SfIconWarehouse size="sm" className="flex-shrink-0 mr-1 text-neutral-500" />
            <p className="text-sm">
              Pickup not available at your shop.
              <SfLink href="#" variant="secondary" className="ml-1">
                Check availability nearby
              </SfLink>
            </p>
          </div>
          <div className="flex mt-4">
            <SfIconSafetyCheck size="sm" className="flex-shrink-0 mr-1 text-neutral-500" />
            <p className="text-sm">
              Free 30-days returns.
              <SfLink href="#" variant="secondary" className="ml-1">
                Details
              </SfLink>
            </p>
          </div> */}
          <div className='flex mb-9'>
            <button className='text-xs text-[#5B6CFF] w-1/3 text-center flex justify-center gap-x-[6px] items-center'>
              <AnnotationDots viewBox='0 0 24 24' width="18" height="18"/>
              ติดต่อเรา
            </button>
            <button className='text-xs text-[#5B6CFF] w-1/3 text-center flex justify-center gap-x-[6px] items-center'>
              <Share04 viewBox='0 0 24 24' width="18" height="18"/>
              แชร์สินค้า
            </button>
            <button className='text-xs text-[#5B6CFF] w-1/3 text-center flex justify-center gap-x-[6px] items-center'>
              <SwitchHorizontal01 viewBox='0 0 24 24' width="18" height="18"/>
              เปรียบเทียบสินค้า
            </button>
          </div>
          <div className="flex mt-4">
            <CoinsStacked01 />
            <div className='block ml-3'>
              <h3 className="text-sm">Perks</h3>
              <p className="text-xs text-[#8A8A8A]">
                รับ Cashback & สิทธิพิเศษอีกมากมาย
              </p>
              <SfLink href="#" variant="secondary" className="text-[#5B6CFF] text-xs" style={{textDecoration:"none"}}>
                ต้องทำอย่างไร
              </SfLink>
            </div>
          </div>
          <div className="flex mt-4">
            <Truck01 />
            <div className='block ml-3'>
              <h3 className="text-sm">ส่งฟรีเมื่อซื้อสินค้าครบ 990 บาท</h3>
              <p className="text-xs text-[#8A8A8A]">
                รอรับสินค้าได้เลย
              </p>
            </div>
          </div>
        </>
        )
      },
      {
        title: "วัสดุ",
        content: "Test"
      },
      {
        title: "คะแนนสินค้า",
        content: (
          <div className='flex gap-x-3'>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-[#FFB800]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 text-[#FFB800]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 text-[#FFB800]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 text-[#FFB800]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-4 h-4 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
            </div>

            <p className='text-[#5B6CFF]'>4.8/5.0</p>
            <p className='text-[#8A8A8A]'>(120 รีวิว)</p>
          </div>
        )
      }
    ]

    useEffect(() => {
      window.scrollTo(0,0)
    }, [])

    return (
      <>
        <header className='p-[8px] bg-black w-full text-center text-white'>
          <p>สมาชิกใหม่รับ ของขวัญฟรี กดรับเลย !! 🎁</p>
        </header>
        <nav className='flex justify-between p-4 absolute top-[40px] z-[999] w-full'>
          <Link to="/" className='p-[9px] rounded-[99px] bg-[#FFFFFF94]' style={{backdropFilter:"blur(6px)"}}>
            <ArrowLeft />
          </Link>
          <button className='p-[9px] rounded-[99px] bg-[#FFFFFF94]' style={{backdropFilter:"blur(6px)"}} onClick={() => setIsOpen(true)}>
            <ShoppingBag01 />
          </button>
        </nav>
        <main className="mx-auto">
            <div className="relative flex w-full max-h-[600px] aspect-[4/3] ">
              <SfScrollable
                className="relative w-full h-full snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                direction="vertical"
                wrapperClassName="h-full"
                buttonsPlacement="none"
                drag={{ containerWidth: true }}
              >
                <div className="absolute inline-flex items-center justify-center text-sm font-medium text-white bg-secondary-600 py-1.5 px-3 mb-4">
                  <SfIconSell size="sm" className="mr-1.5" />
                  Sale
                </div>
                <div className="flex justify-center h-full basis-full shrink-0 grow snap-center">
                  <img
                    src={`https://dev.zaviago.com${product?.website_image}`}
                    className="object-contain w-auto h-full"
                    aria-label={product?.website_image}
                    alt={product?.website_image}
                  />
                </div>
              </SfScrollable>
            </div>
            <section className="md:max-w-[640px] mt-4 px-4">
              <div className='flex justify-between w-full'>
                <h1 className="mb-1 font-bold typography-headline-4 inter">
                  {product?.item_name}
                </h1>
                <strong className="block font-bold typography-headline-3 inter">{product?.formatted_price}</strong>
              </div>
              <p className='text-[#625C5C] text-sm inter'>Women’s Pullover Training Hoodie</p>

              <div className='mt-6 mb-3'>
                <p>สี: {colour}</p>

                <div className='flex mt-3 gap-x-[10px]'>
                  <div className={`w-6 h-6 bg-[#F54E06] rounded-[99px] border-[2px] border-white ${colour === "ส้ม" ? "outline outline-black" : "outline outline-white"}`} onClick={() => setColour("ส้ม")}></div>
                  <div className={`w-6 h-6 bg-black rounded-[99px] border-[2px] border-white ${colour === "ดำ" ? "outline outline-black" : "outline outline-white"}`} onClick={() => setColour("ดำ")}></div>
                </div>
              </div>
                <div dangerouslySetInnerHTML={{ __html: product?.short_description }} />
                <div className='pt-2'>
                    {
                        cart[product?.item_code] && (
                            <div className="bg-primary-100 text-primary-700 flex justify-center gap-1.5 py-1.5 typography-text-sm items-center mb-4 rounded-md">
                                <SfIconShoppingCartCheckout />{cart[product?.item_code]} in cart
                            </div>
                        )
                    }
                    <div className="items-start flex">
                      <SfButton onClick={() => addToCart(product?.item_code, value)} type="button" size="lg" className="w-full" style={{backgroundColor:"black"}}>
                        สั่งซื้อสินค้า
                      </SfButton>
                        <SfButton
                            type="button"
                            variant="tertiary"
                            size="lg"
                            square
                            className="bg-white border border-black ml-4 basis-[20%] text-center py-3 w-[62px] h-[48px]"
                            aria-label="Add to wishlist"
                        >
                            {/* <SfIconFavorite size="sm" color='black'/> */}
                            <Heart color={liked ? "red" : "black"} />
                        </SfButton>
                      {/* <div className="flex flex-col items-stretch xs:items-center xs:inline-flex ml-4">
                        
                        <div className="flex border border-neutral-300 rounded-md">
                            <SfButton
                                type="button"
                                variant="tertiary"
                                square
                                className="rounded-r-none p-3"
                                disabled={value <= min}
                                aria-controls={inputId}
                                aria-label="Decrease value"
                                onClick={() => dec()}
                            >
                                <SfIconRemove />
                            </SfButton>
                            <input
                                id={inputId}
                                type="number"
                                role="spinbutton"
                                className="grow appearance-none mx-2 w-8 text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
                                min={min}
                                max={max}
                                value={value}
                                onChange={handleOnChange}
                            />
                            <SfButton
                                type="button"
                                variant="tertiary"
                                square
                                className="rounded-l-none p-3"
                                disabled={value >= max}
                                aria-controls={inputId}
                                aria-label="Increase value"
                                onClick={() => inc()}
                            >
                                <SfIconAdd />
                            </SfButton>
                        </div>
                        <p className="self-center mt-1 mb-4 text-xs text-neutral-500 xs:mb-0">
                          <strong className="text-neutral-900">{product?.in_stock ? "✔ In Stock" : "❌ sold out"}</strong>
                        </p>
                      </div> */}
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: product?.web_long_description }} />
            </section>

            <Accordion items={items} />

            <div className='mt-[22px]'>
              <h2 className='text-[#3D3D3D] font-bold flex items-center px-5 mb-[14px] leading-6'>
                หากคุณชอบสไตล์นี้
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
        </main>
      </>
    )
}

export default Product


