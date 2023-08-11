import { useRef, useState } from "react"
import { Link } from 'react-router-dom'
import logo from '../../img/logo.svg'
import { ArrowLeft, MarkerPin01, ArrowCircleRight } from '@untitled-ui/icons-react'

const Signup = () => {
  const [phonePage, setPhonePage] = useState(true);
  const [getOTP, setGetOTP] = useState(false);
  const [filledPhone, setFilledPhone] = useState(false);
  const [filledOTP, setFilledOTP] = useState(true);
  const [filledAllOtp, setFilledAllOtp] = useState('')
  const [phoneError, setPhoneError] = useState(false);
  const [otperror, setOtperror] = useState(false)

  const telRef = useRef(null)

  const num1Ref = useRef(null)
  const num2Ref = useRef(null)
  const num3Ref = useRef(null)
  const num4Ref = useRef(null)
  const num5Ref = useRef(null)
  const num6Ref = useRef(null)

  const goBack = () => {
    setGetOTP(false);
    setPhonePage(true);
    setFilledPhone(false);
  }

  const goNext = () => {
    setPhonePage(false)
    setGetOTP(true);
  }

  return (
    <>
      {phonePage && (
        <>
          <header className='p-[14px] border-b border-b-[#F2F2F2] flex gap-x-[7px]'>
            <img src={logo} />
          </header>
          <main className='px-5 py-[46px]'>
            <h1 className='text-[22px] font-bold'>กรอกเบอร์มือถือของคุณ</h1>
            <p className='mt-4'>กรอกเบอร์มือถือของคุณและกดรับรหัสยืนยันทาง SMS (OTP) เพื่อยืนยันเบอร์มือถือของคุณ</p>

            <div className="flex gap-x-3">
              <input type="tel" id="phone" autoComplete="off" ref={telRef} className={`relative border ${phoneError ? "border-[#EC5454]" : "border-[#E3E3E3]"} rounded-[8px] outline-none py-2 px-3 mt-[11px] w-full`} onInput={(e) => {
                if (e.target.value !== ""){
                  setFilledPhone(true)
                } else {
                  setFilledPhone(false)
                }
              }} onKeyDown={() => setPhoneError(false)}/>
            </div>

            {!phoneError ? "" : (<p className="text-[#EC5454] inter mt-2">This phone number is invalid</p>)}

            <button onClick={() => {
              if (telRef.current.value.length !== 10){
                setPhoneError(true);
              } else {
                goNext();
              }
            }} className={`mt-[14px] w-1/2 text-white rounded-[9px] p-3 text-center w-full ${!filledPhone ? "bg-[#C5C5C5] border border-[#C5C5C5]" : "bg-[#111111] border border-[#111111]"}`} disabled={!filledPhone}>รับรหัสยืนยัน SMS (OTP)</button>

            <p className="text-[#9E9E9E] mt-[14px] text-[13px]">หน้าเพจนี้อันรวมไปถึงเอกสารหรือข้อความต่างๆที่มีความเกี่ยวข้องกับหน้าเพจนี้ถูกเขียนขึ้นมาเพื่อแจ้งท่านให้ทราบถึง ข้อกำหนด</p>
          </main>
        </>
      )}

      {getOTP && (
        <>
          <header className='p-[14px] border-b border-b-[#F2F2F2] flex gap-x-[7px]'>
            <button onClick={goBack}>
              <ArrowLeft />
            </button>
            ยืนยันรหัส
          </header>
          <main className='px-5 py-[46px]'>
            <h1 className='text-[22px] font-bold'>ยืนยันรหัส OTP</h1>
            <p className='mt-4'>เราได้ส่ง SMS (OTP) ไปที่เบอร์<br/>090-1234-567</p>

            <div className="flex gap-x-[9px] mt-9">
              <input type="text" maxLength="1" id="num1" ref={num1Ref} className={`border ${otperror ? "border-[#EC5454]" : "border-[#D8DADC]"} w-[16.67%] p-3 text-center text-2xl rounded-[15px]`} autoComplete="off" onKeyDown={() => {
                setOtperror(false);
              }}/>
              <input type="text" maxLength="1" id="num2" ref={num2Ref} className={`border ${otperror ? "border-[#EC5454]" : "border-[#D8DADC]"} w-[16.67%] p-3 text-center text-2xl rounded-[15px]`} autoComplete="off" onKeyDown={() => {
                setOtperror(false);
              }} />
              <input type="text" maxLength="1" id="num3" ref={num3Ref} className={`border ${otperror ? "border-[#EC5454]" : "border-[#D8DADC]"} w-[16.67%] p-3 text-center text-2xl rounded-[15px]`} autoComplete="off" onKeyDown={() => {
                setOtperror(false)
              }} />
              <input type="text" maxLength="1" id="num4" ref={num4Ref} className={`border ${otperror ? "border-[#EC5454]" : "border-[#D8DADC]"} w-[16.67%] p-3 text-center text-2xl rounded-[15px]`} autoComplete="off" onKeyDown={() => {
                setOtperror(false)
              }} />
              <input type="text" maxLength="1" id="num5" ref={num5Ref} className={`border ${otperror ? "border-[#EC5454]" : "border-[#D8DADC]"} w-[16.67%] p-3 text-center text-2xl rounded-[15px]`} autoComplete="off" onKeyDown={() => {
                setOtperror(false)
              }} />
              <input type="text" maxLength="1" id="num6" ref={num6Ref} className={`border ${otperror ? "border-[#EC5454]" : "border-[#D8DADC]"} w-[16.67%] p-3 text-center text-2xl rounded-[15px]`} autoComplete="off" onKeyDown={() => {
                setOtperror(false)
              }} />
            </div>

            {!otperror ? (<p className="text-center mt-[43px]">I didn't receive a code <strong>Resend</strong></p>) : (<p className="text-center text-[#EC5454] inter mt-[43px]">Wrong code, please try again <strong>Resend</strong></p>)}

            <button onClick={() => {
              if (num1Ref.current.value != "" && num2Ref.current.value != "" && num3Ref.current.value != "" && num4Ref.current.value != "" && num5Ref.current.value != "" && num6Ref.current.value != ""){
                setOtperror(false);
                location.href = "/fill-info"
              } else {
                setOtperror(true)
              }
            }} className={`block mt-10 w-1/2 text-white rounded-[9px] p-3 text-center w-full ${!filledOTP ? "bg-[#C5C5C5] border border-[#C5C5C5]" : "bg-[#111111] border border-[#111111]"}`} disabled={!filledOTP}>ยืนยันรหัส OTP</button>
          </main>
        </>
      )}
    </>
  )
}

export default Signup