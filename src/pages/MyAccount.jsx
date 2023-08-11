import { Link } from 'react-router-dom'
import avatarImg from '../img/avatar.svg'
import silverCard from '../img/silvercard.svg'
import qrcode from '../img/qrcode.svg'
import recentViews from '../img/clock-rewind.svg'
import { useState, useEffect, Fragment } from 'react'
import NavHeader from '../components/NavHeader'
import { Dialog, Transition } from '@headlessui/react'
import { 
    Heart,
    File06,
    ClockRewind,
    MarkerPin01,
    ChevronRight,
    CreditCard02,
    Globe02,
    Shield01,
    Lock02,
    Building02,
    BookClosed,
    Gift01,
    AnnotationQuestion,
    AnnotationDots,
    ImageIndentLeft,
    FileShield02,
    LogOut02,
    AlertTriangle
} from '@untitled-ui/icons-react'
import { useFrappeAuth, useFrappeGetDoc } from 'frappe-react-sdk';
import FooterMenu from '../components/FooterMenu'

const MyAccount = () => {
  const [bronzeLevel, setBronzeLevel] = useState(false);
  const [silverLevel, setSilverLevel] = useState(true);

  const [openLogout, setOpenLogout] = useState(false);

  const { currentUser, updateCurrentUser } = useFrappeAuth();

  const { data, isLoading, error } = useFrappeGetDoc('User', currentUser, {
    filters: ['name', 'full_name', 'user_image']
  })

  useEffect(() => {
      updateCurrentUser()
  }, [updateCurrentUser])

  const AccountMenu = ({icon, title, link}) => {
    return (
      <Link to={link} className='flex justify-between items-center px-5 py-[17px] w-full'>
        <div className='flex gap-x-[10px] text-sm text-[#111111] items-center'>
          {icon}
          {title}
        </div>
        <div>
          <ChevronRight />
        </div>
      </Link>
    )
  }

  const settingsMenu = [
    {
      icon: <MarkerPin01 />,
      title: 'ที่อยู่ในการจัดส่ง',
      link: '/shipping-address'
    },
    {
      icon: <CreditCard02 />,
      title: 'การชำระเงิน',
      link: '#'
    },
    {
      icon: <Globe02 />,
      title: 'ประเทศและภาษา',
      link: '#'
    },
    {
      icon: <Shield01 />,
      title: 'ข้อกำหนดและเงื่อนไข',
      link: '#'
    },
    {
      icon: <Lock02 />,
      title: 'ความยินยอมในการเปิดเผยข้อมูล',
      link: '#'
    }
  ]

  const helpMenu = [
    {
      icon: <Building02 />,
      title: 'หน้าร้านของเรา',
      link: '#'
    },
    {
      icon: <BookClosed />,
      title: 'วิธีเก็บคะแนน',
      link: '#'
    },
    {
      icon: <Gift01 />,
      title: 'วิธีแลกของรางวัล',
      link: '#'
    },
    {
      icon: <CreditCard02 />,
      title: 'เงื่อนไขระดับของสมาชิก',
      link: '#'
    },
    {
      icon: <AnnotationQuestion />,
      title: 'คำถามที่พบบ่อย',
      link: '#'
    },
    {
      icon: <AnnotationDots />,
      title: 'ติดต่อเรา',
      link: '#'
    }
  ]

  const additionMenu = [
    {
      icon: <ImageIndentLeft />,
      title: 'เกี่ยวกับแอปฟิเคชั่น',
      link: '#'
    },
    {
      icon: <FileShield02 />,
      title: 'นโยบายความเป็นส่วนตัว',
      link: '#'
    }
  ]

  const accountMenu = [
    {
      icon: <LogOut02 />,
      title: 'ออกจากระบบ',
      link: '/welcome'
    },
  ]
  return (
    <div className='bg-[#F4F4F4] h-full'>
      <NavHeader />
      <header className="pt-20 pb-[60px] px-5 bg-[#BBE5BB] w-full">
        {data && (
          <div className='flex items-center'>
            <img src={data.user_image} width="64" className='rounded-[99px]'/>
            <div className='ml-3 flex flex-col'>
              <span className='font-bold'>{data.full_name}</span>
              <Link className='flex items-center gap-x-1' to='/edit-profile'>
                แก้ไขโปรไฟล์ของฉัน
                <ChevronRight color="#333333" />
              </Link>
            </div>
          </div>
        )}
        {isLoading || error && (
          <div className='flex items-center'>
            <svg className="h-[64px] w-[64px] bg-white text-gray-300 rounded-[99px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <div className='ml-3 flex flex-col'>
              <span className='font-bold'>Loading...</span>
              <Link className='flex items-center gap-x-1'>
                แก้ไขโปรไฟล์ของฉัน
                <ChevronRight color="#333333" />
              </Link>
            </div>
          </div>
        )}
      </header>
      <main className='px-5 relative top-[-40px] pb-[100px]'>
        <div className='bg-white rounded-[6px] items-center' style={{filter:"drop-shadow(0 4px 20px #6363630D"}}>
          <div className='flex justify-between p-5'>
            <div className='flex items-center gap-x-[14px]'>
              <img src={silverLevel ? silverCard : ""} />
              <div className='text-[#333333] font-bold'>ระดับ : {silverLevel ? "Silver" : ""}</div>
            </div>
            <div>
              <Link to="/my-id" className='bg-[#00B14F] flex gap-x-2 text-white items-center text-sm p-1 rounded-[4px]'>
                <img src={qrcode} />
                ID ของฉัน
              </Link>
            </div>
          </div>

          <div className='p-5'>
            <div className='flex'>
              <div className='basis-1/3 flex gap-x-1 text-[13px] justify-center'>
                Wallet
              </div>
              <div className='basis-1/3 flex gap-x-1 text-[13px] justify-center'>
                Coins
              </div>
              <div className='basis-1/3 flex gap-x-1 text-[13px] justify-center'>
                <Link to="/my-coupon">Coupon</Link>
              </div>
            </div>

            <div className='flex'>
              <div className='basis-1/3 flex gap-x-1 text-[13px] justify-center'>
                <span className='text-[#1BB040]'>฿ </span>850
              </div>
              <div className='basis-1/3 flex gap-x-1 text-[13px] justify-center'>
                230 <span className='text-[#FFA800]'>coins</span>
              </div>
              <div className='basis-1/3 flex gap-x-1 text-[13px] justify-center'>
                8 <span className='text-[#BC0000]'>codes</span>
              </div>
            </div>
          </div>

          <hr style={{borderColor:"#F2F2F2"}}/>

          <div className='p-5 w-full flex'>
            <Link to="/wishlist" className='basis-1/3 text-sm flex flex-col items-center text-center text-[#333333] gap-y-[10px]'>
              <Heart color='#333333'/>
              รายการสินค้า<br/>ที่ถูกใจ
            </Link>
            <Link to="/my-order" className='basis-1/3 text-sm flex flex-col items-center text-center text-[#333333] gap-y-[10px]'>
              <File06 color='#333333'/>
              คำสั่งซื้อ<br/>ของฉัน
            </Link>
            <Link to="#" className='basis-1/3 text-sm flex flex-col items-center text-center text-[#333333] gap-y-[10px]'>
              <ClockRewind color='#333333'/>
              สินค้าที่<br/>ดูล่าสุด
            </Link>
          </div>

          <hr style={{borderColor:"#F2F2F2"}}/>

          <div className='inline-block w-full'>
            <button className='p-4 my-2 w-1/2 border-r border-r-[#F2F2F2]'>การใช้งานคะแนน</button>
            <button className='p-4 my-2 w-1/2'>ระดับคะแนน</button>
          </div>
        </div>

        <h2 className='mt-[30px] mb-[10px]'>การตั้งค่า</h2>
        <div className='flex flex-col bg-white rounded-[6px] items-center gap-y-[10px]' style={{filter:"drop-shadow(0 4px 20px #6363630D"}}>
          {settingsMenu.map((menu) => 
            <AccountMenu icon={menu.icon} title={menu.title} link={menu.link} />
          )}
        </div>

        <h2 className='mt-[30px] mb-[10px]'>ความช่วยเหลือ</h2>
        <div className='flex flex-col bg-white rounded-[6px] items-center gap-y-[10px]' style={{filter:"drop-shadow(0 4px 20px #6363630D"}}>
          {helpMenu.map((menu) => 
            <AccountMenu icon={menu.icon} title={menu.title} link={menu.link} />
          )}
        </div>

        <h2 className='mt-[30px] mb-[10px]'>ข้อมูลเพิ่มเติม</h2>
        <div className='flex flex-col bg-white rounded-[6px] items-center gap-y-[10px]' style={{filter:"drop-shadow(0 4px 20px #6363630D"}}>
          {additionMenu.map((menu) => 
            <AccountMenu icon={menu.icon} title={menu.title} link={menu.link} />
          )}
        </div>

        <h2 className='mt-[30px] mb-[10px]'>บัญชี</h2>
        <div className='flex flex-col bg-white rounded-[6px] items-center gap-y-[10px]' style={{filter:"drop-shadow(0 4px 20px #6363630D"}}>
          <button className='flex justify-between items-center px-5 py-[17px] w-full' onClick={() => setOpenLogout(true)}>
            <div className='flex gap-x-[10px] text-sm text-[#111111] items-center'>
              <LogOut02 />
              ออกจากระบบ
            </div>
            <div>
              <ChevronRight />
            </div>
          </button>
        </div>
      </main>
      <FooterMenu active={3} />

      <Transition.Root show={openLogout} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenLogout}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all w-full max-w-md">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EC5454]">
                      <AlertTriangle color="white"/>
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-[#333333]">
                        คุณต้องการ<br/> 'ออกจากระบบ' ใช่หรือไม่
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-xs text-[#8A8A8A]">
                          กดยืนยันเพื่อทำการออกจากระบบ<br/> โดยคุณสามารถเข้าสู่ระบบอีกครั้ง<br/> ได้ด้วย Line ของคุณ
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-flow-row-dense grid-cols-2 gap-3">
                    <button
                      type="button"
                      className='w-full bg-white border border-[#111111] text-[#111111] rounded-[9px] p-3 text-center'
                      onClick={() => setOpenLogout(false)}
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="button"
                      className='w-full bg-[#111111] border border-[#111111] text-white rounded-[9px] p-3 text-center'
                      onClick={() => location.href = "/welcome"}
                    >
                      ออกจากระบบ
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}

export default MyAccount