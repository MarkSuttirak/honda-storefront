import { useRef, useState, Fragment } from "react"
import { ArrowLeft, MarkerPin01 } from '@untitled-ui/icons-react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import logo from '../img/hondaLogo.png'
import { Dialog, Transition } from '@headlessui/react'
import { useCountdown } from "../hooks/useCountDown";
import { useUser } from '../hooks/useUser'
import ThaiFlag from "../components/icons/ThaiFlag";
import hondaLogo from '../img/hondaLogo.png'

const Phonverify = () => {
  const [filledInfo, setFilledInfo] = useState(false)
  const [userphone, Setuserphone] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [myotp, setmyotp] = useState('');
  const [errornow, seterrornow] = useState('');
  const [phonePage, setPhonePage] = useState(true);
  const [getOTP, setGetOTP] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [phoneExist, setPhoneExist] = useState(false)
  const [otperror, setOtperror] = useState(false);
  const [pdpa, setPdpa] = useState(true);
  const [acceptPdpa, setAcceptPdpa] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const { refetch } = useUser()
  const [filledPhone, setFilledPhone] = useState(false);
  const [filledOTP, setFilledOTP] = useState(true);
  const [filledAllOtp, setFilledAllOtp] = useState('')
  const [days, hours, minutes, seconds] = useCountdown(new Date().getTime() + 60000);
  const navigate = useNavigate();

  const telRef = useRef(null)

  const num1Ref = useRef(null)
  const num2Ref = useRef(null)
  const num3Ref = useRef(null)
  const num4Ref = useRef(null)
  const num5Ref = useRef(null)
  const num6Ref = useRef(null)
  const inputRefs = [num1Ref, num2Ref, num3Ref, num4Ref, num5Ref, num6Ref]

  const handleChange = event => {
    const value = event.target.value.replace(/\D/g, "");
    Setuserphone(value);
  };

  const clickverify = (value) => {
    if (userphone.length > 7) {
      phonverifynow(userphone);
    }
  }

  const verifyotp = () => {
    setShowConfirm(true);
    verifyotpnow(userphone, getOTPValue(), Cookies.get('username'))
  }
  const getOTPValue = () => {
    let otp = '';
    inputRefs.forEach(ref => {
      otp += ref.current.value;
    });
    return otp;
  };

  const phonverifynow = (phone) => {
    try {
      return fetch("https://hondanont.zaviago.com/api/method/honda_api.api_calls.verifyuser.getphone?userphone=" + phone, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }).then((response) => response.json()).then((data) => {
        var res = data.message;

        if (res.status == 'success') {
          seterrornow('');
          seterrornow(res.message);
          setPhonePage(false)
          setDisabled(true)
        }
        else {
          setPhoneExist(true);
          seterrornow(res.message);
          setPhonePage(true)
          setDisabled(false)
        }

      })

    } catch (error) {
      return error;
    }
  }
  const verifyotpnow = (userphone, myotp, username) => {
    if(!myotp){
      seterrornow('Please Enter OTP');
      setShowConfirm(false);
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");
    myHeaders.append("Authorization", "Bearer " + Cookies.get('token'));

    var requestOptions = {
      method: 'POST',
      headers: myHeaders
    };
    fetch("https://hondanont.zaviago.com/api/method/honda_api.api_calls.verifyuser.verifyotp?userphone=" + userphone + "&otp=" + myotp + "&username=" + username, requestOptions)
      .then((response) => response.json()).then((data) => {
        var res = data.message;

        if (res.status == 'success') {
          seterrornow('');
          seterrornow(res.message);
          Cookies.set('phoneverify', false);
          refetch().then(() => navigate("/"))
        }
        else {
          setShowConfirm(false);
          seterrornow(res.message);
          setPhonePage(false)
          setDisabled(false)
        }
      })
      .catch(error => console.log('error', error));
  }

  // const handleotpchange = event => {
  //   const value = event.target.value.replace(/\D/g, "");
  //   setmyotp(value);
  // };

  // Created new functions for 6-digit OTP inputs
  const handleChangeOTP = (e, index) => {
    if (e.target.value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const typeOTP = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '') {
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  }

  return (
    <>
      <header className='p-[14px] flex gap-x-[7px] relative text-md font-bold fixed w-full bg-white top-0 z-[9]'>
        <Link to={phonePage ? "/login" : ""} className="absolute left-[14px]" onClick={() => {!phonePage && setPhonePage(true)}}>
          <ArrowLeft />
        </Link>
        <picture className="mx-auto">
          <source srcSet={hondaLogo} media="(min-width: 768px)" />
          <img
            src={hondaLogo}
            alt="Sf Logo"
            className="w-[60px]"
          />
        </picture>
      </header>
      {phonePage ? (
        <>
          <main className='px-5 pt-[26px] pb-8'>
            <h1 className='text-[20px] font-bold'>กรอกหมายเลขโทรศัพท์</h1>
            <p className='text-[#00000061] text-sm'>กรุณากรอกหมายเลขโทรศัพท์ของคุณเพื่อรับรหัส OTP</p>

            <p className='text-[#00000061] text-sm mt-6'>กรอกหมายเลขโทรศัพท์</p>
            <div className="flex gap-x-3 mt-2">
              <div className="border border-[#E3E3E3] rounded-[8px] py-2 px-3 inter flex items-center gap-x-2">
                <ThaiFlag /> +66
              </div>

              <input type="tel" id="phone" autoComplete="off" ref={telRef} onChange={handleChange} className={`inter font-bold relative border ${phoneError ? "border-[#EC5454]" : "border-[#E3E3E3]"} rounded-[8px] outline-none py-2 px-3 w-full`} onInput={(e) => {
                if (e.target.value !== "") {
                  setFilledPhone(true)
                } else {
                  setFilledPhone(false)
                }
              }} onKeyDown={() => setPhoneError(false)} />
            </div>

            {!phoneError ? "" : (<p className="text-[#EC5454] mt-2 text-sm">เบอร์โทรศัพท์ไม่ถูกต้อง</p>)}
            {!phoneExist ? "" : (<p className="text-[#EC5454] mt-2 text-sm">This phone number already exists. Please <a href='https://lin.ee/gv2ZwpY' className="underline">contact us</a></p>)}

            <p className="my-[30px] text-[#00000061] text-sm text-center">คุณจะได้รับรหัสยืนยันตัวตนจำนวน 6 หลัก</p>

            <button onClick={() => {
              if (telRef.current.value.length < 10) {
                setPhoneError(true);
              } else {
                clickverify();
              }
            }} className={`w-1/2 text-white rounded-[9px] p-3 text-center w-full`} style={{ background: !filledPhone ? "#C5C5C5" : "linear-gradient(133.91deg, #F16A28 1.84%, #F9A30F 100%)" }} disabled={!filledPhone}>รับรหัส OTP</button>
          </main>
        </>
      ) : (
        <main className={`px-5 pb-[46px] pt-[26px]`}>
          <h1 className='text-[22px] font-bold'>กรอกรหัสผ่าน OTP</h1>
          <p className='mt-1 text-[#00000061] text-sm'>รหัส OTP จะส่งไปยังหมายเลขโทรศัพท์ของคุณ</p>

          <p className='mt-6 text-[#00000061] text-sm'>กรอกรหัส OTP</p>
          {/* <input onChange={handleotpchange} value={myotp} className={`${otperror ? "border border-[#F0592A]" : "border border-[#F8F8F8]"} bg-[#F8F8F8] w-full rounded-[8px] outline-none py-2 px-3 mt-[11px] text-center text-[20px] font-bold`} id='otp' name='otp' type='tel' /> */}
          
          {/* 6-digit OTP inputs that are used instead of one input */}
          <div className="mt-[11px] flex gap-x-2">
            {inputRefs.map((inputRef, index) => (
              <input 
                key={index}
                ref={inputRef} 
                className={`border ${otperror ? "border-[#F0592A]" : inputRef?.current?.value !== "" ? 'border-black' : 'border-[#E3E3E3]'} h-[60px] w-full rounded-[15px] outline-none py-2 px-3 text-center text-[20px] font-bold`} 
                id={`otp-${index + 1}`}
                name='otp' 
                type='tel' 
                maxLength={1}
                onKeyDown={(e) => typeOTP(e, index)}
                onChange={(e) => handleChangeOTP(e, index)}
              />
            ))}
          </div>
          {otperror && (<p className="text-[#F0592A] inter mt-2 text-sm" style={{ fontFamily: "Eventpop" }}>รหัส OTP ไม่ถูกต้อง</p>)}
          <p className="text-[#00000061] inter mt-2 text-sm" style={{ fontFamily: "Eventpop" }}>{errornow}</p>

          <p className='my-8 text-[#000000B3] text-sm text-center'>ไม่ได้รับรหัส ? <span onClick={verifyotp} className="text-sm underline text-black">ขอรหัส OTP อีกครั้ง</span></p>
          {/* <p className="mt-8 mb-[48px] text-sm text-center">ขอรหัส OTP ใหม่อีกครั้งใน 00:{seconds} วินาที</p> */}

          <button onClick={verifyotp} className={`text-white rounded-[9px] p-3 w-full bg-black flex items-center justify-center mt-[14px]`} style={{ background: !filledOTP ? "#C5C5C5" : "linear-gradient(133.91deg, #F16A28 1.84%, #F9A30F 100%)" }} >ยืนยันรหัส OTP</button>
        </main>
      )}

      {/* <main className='px-5 py-[46px]'>
          <div className='flex flex-col relative'>
              <div className="showerror">{errornow}</div>
              <label htmlFor='phone'>เบอร์โทร</label>
              <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' onChange={handleChange} value={userphone} id='phone' name='phone' type='tel' disabled={disabled}/>
              <button onClick={clickverify} className="absolute translate-y-[38px] right-[4px] bg-black text-white px-3 py-[6px] rounded-[6px]">Send</button>
              
              
              <input  onChange={handleotpchange} value={myotp} className={`${show ? "invisible" : "visible"} border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]`} placeholder="OTP"  id='otp' name='otp' type='tel'/>
              <button onClick={verifyotp} className={`${show ? "invisible" : "visible"} text-white rounded-[9px] p-3 w-full bg-black flex items-center justify-center mt-8`}>ยืนยันรหัส OTP</button>
          </div>
      </main> */}

      <Transition.Root show={showConfirm} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setShowConfirm(false)}>
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
                  <div className='my-10'>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-[#333333]">
                        ระบบกำลังทำการสมัครสมาชิก
                      </Dialog.Title>
                      <div className="mt-2 mb-5">
                        <p className="text-xs text-[#8A8A8A]">
                          กรุณารอสักครู่
                        </p>
                      </div>
                    </div>
                    <div className="loading-icon">
                      <div className="inner-icon"></div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>


      <Transition.Root show={pdpa} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setPdpa(false)}>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-5 pt-5 pb-4 text-left shadow-xl transition-all w-full max-w-md">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-[24px] font-bold leading-6 text-[#333333] mb-8">
                        นโยบายข้อมูลส่วนบุคคล
                      </Dialog.Title>

                      <div className="mt-2 text-left">
                        <article>
                          <h2 className="font-bold mb-3">นโยบายความเป็นส่วนตัว</h2>
                          <p className="font-medium text-sm text-[#585858]">มีความมุ่งมั่นในการปกป้องความเป็นส่วนตัวและข้อมูลส่วนบุคคลของลูกค้าและผู้ใช้บริการของเรานโยบายความเป็นส่วนตัวนี้อธิบายถึงประเภทของข้อมูลส่วนบุคคลที่เราเก็บรวบรวมวิธีการเก็บรวบรวมและใช้ข้อมูลนั้นและสิทธิของคุณเกี่ยวกับข้อมูลส่วนบุคคลของคุณโดยการเข้าถึงเว็บไซต์ของเราและ/หรือการใช้บริการของเรา คุณยินยอมให้เราเก็บรวบรวมและใช้ข้อมูลส่วนบุคคลของคุณตามนโยบายความเป็นส่วนตัวนี้</p>
                        </article>
                        <article className="mt-8">
                          <h2 className="font-bold mb-3">1. การเก็บรวบรวมข้อมูลส่วนบุคคล</h2>
                          <p className="font-medium text-sm text-[#585858]">บริษัทขอสงวนสิทธิ์ในการเก็บรวบรวมใช้งานและเปิดเผยข้อมูลส่วนบุคคลของท่านตามกฎหมายของพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) โดยบริษัทจะดำเนินการเก็บรวบรวมข้อมูลส่วนบุคคลของท่านเฉพาะเมื่อจำเป็นต่อการให้บริการและปฏิบัติตามกฎหมาย</p>
                        </article>
                        <article className="mt-4">
                          <h2 className="font-bold mb-3">2. วัตถุประสงค์ในการเก็บรวบรวมข้อมูลส่วนบุคคล</h2>
                          <p className="font-medium text-sm text-[#585858]">ข้อมูลส่วนบุคคลที่บริษัทเก็บรวบรวมจะใช้เพื่อวัตถุประสงค์ต่อไปนี้:</p>
                          <ul className="list-disc ml-5 mt-2 font-medium text-xs text-[#585858]">
                            <li>ให้บริการและจัดการบัญชีของท่าน</li>
                            <li>ดำเนินการตามคำขอหรือความต้องการของท่าน</li>
                            <li>วิเคราะห์และปรับปรุงการให้บริการ</li>
                            <li>อื่นๆตามกฎหมาย</li>
                          </ul>
                        </article>
                        <article className="mt-4">
                          <h2 className="font-bold mb-3">3. การรักษาความมั่นคงปลอดภัยของข้อมูลส่วนบุคคล</h2>
                          <p className="font-medium text-sm text-[#585858]">บริษัทไม่มีสิทธิ์ในการเปิดเผยข้อมูลส่วนบุคคลของท่านให้แก่บุคคลภายนอกยกเว้นในกรณีที่บริษัทได้รับความยินยอมจากท่านหรือเมื่อบริษัทมีหน้าที่ตามกฎหมายจะต้องเปิดเผยข้อมูล</p>
                        </article>
                        <article className="mt-4">
                          <h2 className="font-bold mb-3">4. สิทธิ์ทรัพย์สินทางปัญญา</h2>
                          <p className="font-medium text-sm text-[#585858]">บริษัทจะดำเนินการรักษาความมั่นคงปลอดภัยของข้อมูลส่วนบุคคลของท่าน</p>
                        </article>

                        <footer className="relative mt-10">
                          <label for='accept' className="text-sm flex items-center gap-x-2 text-[#2C2C2E]">
                            <input type='checkbox' onChange={(e) => {
                              if (e.target.checked) {
                                setAcceptPdpa(true)
                              } else {
                                setAcceptPdpa(false)
                              }
                            }} id='accept' />
                            <span className="accept-checkbox"></span>
                            ข้าพเจ้าได้อ่าน และ ยินยอมให้ข้อมูลส่วนบุคคล
                          </label>
                        </footer>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-flow-row-dense grid gap-3">
                    <button
                      type="button"
                      onClick={() => setPdpa(false)}
                      className={`w-full text-white rounded-[9px] p-3 text-center`}
                      style={{ background: acceptPdpa ? "linear-gradient(133.91deg, #F16A28 1.84%, #F9A30F 100%)" : "#C5C5C5" }}
                      disabled={!acceptPdpa}
                    >
                      ต่อไป
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default Phonverify;