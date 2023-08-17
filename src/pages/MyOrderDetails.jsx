import { Link, useParams } from "react-router-dom"
import { ArrowLeft, CreditCard02, ChevronRight, MarkerPin01, ShoppingBag01, AnnotationDots, Share04, SwitchHorizontal01 } from "@untitled-ui/icons-react"
import { useFrappeGetDoc, useFrappeGetDocList } from "frappe-react-sdk"
import testImg from '../img/test-img.png'
import qrcodeMock from '../img/qrcode-redeem.svg'
import barcodeMock from '../img/barcode-mock.svg'
import QRCode from "react-qr-code";
import Barcode from 'react-barcode';
import { useState } from 'react'
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

const MyOrderDetails = () => {
  const { id } = useParams()

  const [code, setCode] = useState(true);
  const [qrcode, setQrcode] = useState(false);
  const [barcode, setBarcode] = useState(false);

  const [discounted, setDiscounted] = useState(false);
  const [rewardReddem, setRewardRedeem] = useState(false);

  const { data, isLoading, error } = useFrappeGetDoc('Sales Invoice', id, {
    fields: ['name', 'address', 'status', 'due_date', 'customer_address', 'items']
  })

  if (data){
    console.log(data)
  }

  const switchToCode = () => {
    setCode(true);
    setQrcode(false);
    setBarcode(false);
  }

  const switchToQrcode = () => {
    setCode(false);
    setQrcode(true);
    setBarcode(false);
  }

  const switchToBarcode = () => {
    setCode(false);
    setQrcode(false);
    setBarcode(true);
  }

  return (
    <>
      <header className='p-[14px] border-b border-b-[#F2F2F2] flex gap-x-[7px] text-md font-bold bg-white fixed bg-white top-0 w-full z-[999]'>
        <Link to="/my-order">
          <span className="sr-only">Close panel</span>
          <ArrowLeft />
        </Link>
        คำสั่งซื้อของฉัน
      </header>
        {data && (
          <main className="mt-[53px]">
            <div className="relative flex w-full max-h-[600px] aspect-[4/3]">
              <SfScrollable
                className="relative w-full h-full snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                direction="vertical"
                wrapperClassName="w-full"
                buttonsPlacement="none"
                drag={{ containerWidth: true }}
              >
                <div className="flex justify-center h-full basis-full shrink-0 grow snap-center">
                  <img
                    src={data.items[0].image !== "" && `https://dev.zaviago.com/${data.items[0].image}`}
                    className={`object-cover w-full h-full ${data.items[0].image === null || data.items[0].image === undefined || data.items[0].image === "" && 'bg-[#C5C5C5]'}`}
                    // aria-label={product?.website_image}
                    // alt={product?.website_image}
                  />
                </div>
              </SfScrollable>
            </div>
            <div className="px-5 mb-4">
              <div className="w-full relative mx-auto z-10 bg-white py-[30px] rounded-[10px] -mt-[18px]" style={{ boxShadow: "0px 4px 20px 0px #EBE9EA", }}>
                <div className='text-center'>
                    <button className='bg-[#FDF0E4] w-[66px] h-[19px] rounded-full px-[10px] py-[4px] text-[#F0592A] font-bold text-[10px] leading-[11.1px]' style={{ fontFamily: "Eventpop" }} >ใช้หน้าร้าน</button>
                    {rewardReddem && (
                      <div className='mt-[5px]'>
                          <button className='bg-[#F0F0F0] h-[19px] rounded-full px-[10px] py-[4px] text-[#8A8A8A] font-bold text-[10px] leading-[11.1px]' style={{ fontFamily: "Eventpop" }} >แลกของรางวัลแล้ว</button>
                      </div>
                    )}
                    <p className='font-bold text-sm leading-[17px] text-[#111111] mt-2' style={{ fontFamily: "Eventpop" }}>{data.items[0].item_name}</p>
                </div>
                <div className='block w-[100%] m-auto'>
                  <button className='my-2 w-1/3' onClick={switchToCode}>
                    <span className={`p-4 inline-block text-xs ${code ? "text-[#F0592A]" : "text-[#8A8A8A]"}`}>Code</span>
                    {code && (
                      <div className="w-full h-[2px] bg-[#F0592A] border-anim"></div>
                    )}
                  </button>
                  <button className='my-2 w-1/3' onClick={switchToQrcode}>
                    <span className={`p-4 inline-block text-xs ${qrcode ? "text-[#F0592A]" : "text-[#8A8A8A]"}`}>QR Code</span>
                    {qrcode && (
                      <div className="w-full h-[2px] bg-[#F0592A] border-anim"></div>
                    )}
                  </button>
                  <button className='my-2 w-1/3' onClick={switchToBarcode}>
                    <span className={`p-4 inline-block text-xs ${barcode ? "text-[#F0592A]" : "text-[#8A8A8A]"}`}>Barcode</span>
                    {barcode && (
                      <div className="w-full h-[2px] bg-[#F0592A] border-anim"></div>
                    )}
                  </button>
                </div>

                {code && (
                  <div className="mt-[44px]">
                    <button className="text-white text-center block w-[80%] m-auto p-[11px] rounded-[8px]" style={{background:"linear-gradient(133.91deg, #F16A28 1.84%, #F9A30F 100%)"}}>{data.name}</button>

                    <p className="text-[#8A8A8A] text-xs mt-[35px] text-center">กรุณากรอกหรือส่งโค้ดนี้ให้พนักงาน<br/>ที่หน้าร้านเพื่อรับของรางวัล</p>
                  </div>
                )}

                {qrcode && (
                  <div className="mt-[44px]">
                    <QRCode size={150} value={data.name} style={{border:"4px solid #FDF0E4",borderRadius:"10px",padding:"10px",margin:"auto"}}/>

                    <p className="text-[#00000061] text-xs text-center mt-6">
                      ใช้ภายใน 
                      <strong className="text-[#F0592A] ml-1">15:00</strong>
                    </p>

                    <p className="text-[#8A8A8A] text-xs mt-4 text-center">กรุณานำ QR Code นี้ให้พนักงานสแกน<br/>ที่หน้าร้านเพื่อรับของรางวัล</p>
                  </div>
                )}

                {barcode && (
                  <div className="mt-[44px]">
                    <div className="flex justify-center">
                      <Barcode value={data.name} width="1"/>
                    </div>
                    <p className="text-[#000000] text-xs text-center mt-2"></p>
                    <p className="text-[#8A8A8A] text-xs mt-4 text-center">กรุณานำ Barcode นี้ให้พนักงานสแกน<br/>ที่หน้าร้านเพื่อรับของรางวัล</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        )}
    </>
  )
}

export default MyOrderDetails