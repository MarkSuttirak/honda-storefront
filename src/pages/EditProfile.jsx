import React, { useState, useRef,useEffect,Fragment } from "react"
import TitleHeader from "../components/TitleHeader"
import { ArrowLeft } from '@untitled-ui/icons-react'
import successIcon from '../img/success.svg'
import { Link } from "react-router-dom"
import { useUser } from '../hooks/useUser';
import { useFrappePostCall } from "frappe-react-sdk"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from '@headlessui/react'
import checkmark from "../img/redeemed-mark.svg"

const EditProfile = () => {
  const { user } = useUser()


  const { call, isCompleted } = useFrappePostCall("honda_api.api_calls.getuser.update_profile")


  const navigate = useNavigate();
  const [editPro, setEditPro] = useState(true)
  const [changePhone, setChangePhone] = useState(false)
  const [changedSuccessfully, setChangedSuccessfully] = useState(false);

  const [confirmOTP, setConfirmOTP] = useState(false);
  const [getOTP, setGetOTP] = useState(false);
  const [filledPhone, setFilledPhone] = useState(false);
  const [filledOTP, setFilledOTP] = useState(true);
  const [filledAllOtp, setFilledAllOtp] = useState('')
  const [phoneError, setPhoneError] = useState(false);
  const [otperror, setOtperror] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const telRef = useRef(null)

  const num1Ref = useRef(null)
  const num2Ref = useRef(null)
  const num3Ref = useRef(null)
  const num4Ref = useRef(null)
  const num5Ref = useRef(null)
  const num6Ref = useRef(null)

  useEffect(() => {
    if (isCompleted) {
      // navigate("/my-account")
      setIsSaving(false)
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2000)
    }
  }, [isCompleted])

  const changeToEditPro = () => {
    setChangePhone(false);
    setEditPro(true);
    setConfirmOTP(false);
    setChangedSuccessfully(false);
  }

  const changeToChangePhone = () => {
    setChangePhone(true);
    setEditPro(false);
  }

  const goNext = () => {
    setChangePhone(false);
    setConfirmOTP(true);
  }

  const canChangeIt = () => {
    setConfirmOTP(false);
    setChangedSuccessfully(true);
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <>
      {editPro && (
        <>
          <TitleHeader title="แก้ไขโปรไฟล์" link="/my-account" />
          <main className='p-5 mt-[53px]'>
            <ProfileForm
              initialValues={{
                first_name: user?.user.first_name,
                last_name: user?.user.last_name,
                email: user?.user.user_email,
                phone: user?.user?.phone,
                id_card_number: user?.user?.id_card_number, 
                birth_date: user?.user?.birth_date
              }}
              onSubmit={call}
              isSaving={isSaving}
              isSaved={isSaved}
              setIsSaving={() => setIsSaving(true)}
            />
          </main>
        </>
      )}

      {changePhone && (
        <>
          <header className='p-[14px] border-b border-b-[#F2F2F2] flex gap-x-[7px] text-md font-bold fixed w-full top-0 bg-white z-[999]'>
            <button onClick={changeToEditPro}>
              <ArrowLeft />
            </button>
            เปลี่ยนเบอร์โทร
          </header>
          <main className='px-5 py-[46px] mt-[53px]'>
            <h1 className='text-[22px] font-bold'>เปลี่ยนเบอร์มือถือของคุณ</h1>
            <p className='mt-4'>กรอกเบอร์มือถือของคุณและกดรับรหัสยืนยันทาง SMS (OTP) เพื่อยืนยันเบอร์มือถือของคุณ</p>

            <div className="flex gap-x-3">
              <input type="tel" id="phone" autoComplete="off" ref={telRef} className={`relative border ${phoneError ? "border-[#EC5454]" : "border-[#E3E3E3]"} rounded-[8px] outline-none py-2 px-3 mt-[11px] w-full`} onInput={(e) => {
                if (e.target.value !== "") {
                  setFilledPhone(true)
                } else {
                  setFilledPhone(false)
                }
              }} onKeyDown={() => setPhoneError(false)} />
            </div>

            {!phoneError ? "" : (<p className="text-[#EC5454] inter mt-2">This phone number is invalid</p>)}

            <button onClick={() => {
              if (telRef.current.value.length !== 10) {
                setPhoneError(true);
              } else {
                goNext();
              }
            }} className={`mt-[14px] w-1/2 text-white rounded-[9px] p-3 text-center w-full ${!filledPhone ? "bg-[#C5C5C5] border border-[#C5C5C5]" : "bg-[#111111] border border-[#111111]"}`} disabled={!filledPhone}>รับรหัสยืนยัน SMS (OTP)</button>

            <p className="text-[#9E9E9E] mt-[14px] text-[13px]">หน้าเพจนี้อันรวมไปถึงเอกสารหรือข้อความต่างๆที่มีความเกี่ยวข้องกับหน้าเพจนี้ถูกเขียนขึ้นมาเพื่อแจ้งท่านให้ทราบถึง ข้อกำหนด</p>
          </main>
        </>
      )}

      {confirmOTP && (
        <>
          <header className='p-[14px] border-b border-b-[#F2F2F2] flex gap-x-[7px] text-md font-bold'>
            <button onClick={changeToEditPro}>
              <ArrowLeft />
            </button>
            เปลี่ยนเบอร์โทร
          </header>
          <main className='px-5 py-[46px]'>
            <h1 className='text-[22px] font-bold'>ยืนยันรหัส OTP</h1>
            <p className='mt-4'>เราได้ส่ง SMS (OTP) ไปที่เบอร์<br />090-1234-567</p>

            <div className="flex gap-x-[9px] mt-9">
              <input type="text" maxLength="1" id="num1" ref={num1Ref} className={`border ${otperror ? "border-[#EC5454]" : "border-[#D8DADC]"} w-[16.67%] p-3 text-center text-2xl rounded-[15px]`} autoComplete="off" onKeyDown={() => {
                setOtperror(false);
              }} />
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
              if (num1Ref.current.value != "" && num2Ref.current.value != "" && num3Ref.current.value != "" && num4Ref.current.value != "" && num5Ref.current.value != "" && num6Ref.current.value != "") {
                setOtperror(false);
                canChangeIt();
              } else {
                setOtperror(true)
              }
            }} className={`block mt-10 w-1/2 text-white rounded-[9px] p-3 text-center w-full ${!filledOTP ? "bg-[#C5C5C5] border border-[#C5C5C5]" : "bg-[#111111] border border-[#111111]"}`} disabled={!filledOTP}>ยืนยันรหัส OTP</button>
          </main>
        </>
      )}

      {changedSuccessfully && (
        <>
          <header className='p-[14px] border-b border-b-[#F2F2F2] flex gap-x-[7px] text-md font-bold'>
            <button onClick={changeToEditPro}>
              <ArrowLeft />
            </button>
            เปลี่ยนเบอร์โทร
          </header>
          <main className='px-5 py-[46px]'>
            <img src={successIcon} />
            <h1 className='text-[30px] font-bold mt-5'>ระบบเปลี่ยนเบอร์<br />ใหม่สำเร็จ 👋</h1>
            <p className='mt-4'>ระบบได้เปลี่ยนเบอร์ใหม่เรียบร้อยแล้ว<br /> คุณสามารถย้อนกลับไปหน้าอื่น ๆ ได้</p>
          </main>
          <footer className='flex px-5 gap-x-3'>
            <Link to="/" className='w-full bg-[#111111] border border-[#111111] text-white rounded-[9px] p-3 text-center'>กลับไปหน้าเดิม</Link>
          </footer>
        </>
      )}

      <Transition.Root show={isSaving || isSaved} as={Fragment}>
        <Dialog as="div" className="relative z-[999]" onClose={() => {}}>
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
                        {isSaving ? "กำลังบันทึกข้อมูล" : "บันทึกข้อมูลเสร็จสิ้น"}
                      </Dialog.Title>
                      <div className="mt-2 mb-5">
                        <p className="text-xs text-[#8A8A8A]">
                          {isSaving ? "รอสักครู่ระบบกำลังทำการบันทึกข้อมูลของคุณ" : "คุณได้ทำการเปลี่ยนแปลงและบันทึกข้อมูลเรียบร้อยแล้ว"}
                        </p>
                      </div>
                    </div>
                    {isSaving ? <div className="loading-icon">
                      <div className="inner-icon"></div>
                    </div> : <img src={checkmark} className="mx-auto" alt="checkmark"/>}
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

export default EditProfile

export const ProfileForm = ({
  initialValues,
  onSubmit,
  setIsSaving
}) => {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit
  })
const navigate = useNavigate();
  return (
    <form className='flex flex-col gap-y-5' onSubmit={formik.handleSubmit}>
      <div className='flex flex-col'>
        <label htmlFor='name'>ชื่อ</label>
        <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' name='first_name' value={formik.values.first_name} onChange={formik.handleChange} />
      </div>

      <div className='flex flex-col'>
        <label htmlFor='surname'>นามสกุล</label>
        <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' name='last_name' value={formik.values.last_name} onChange={formik.handleChange} />
      </div>

      <div className='flex flex-col'>
        <label htmlFor='email'>อีเมล</label>
        <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' name='email' type='email' value={formik.values.email} onChange={formik.handleChange} />
      </div>

      <div className='flex flex-col'>
        <label htmlFor='id_card_number'>เลขประจำตัวบัตรประชาชน</label>
        <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' name='id_card_number' type='text' value={formik.values.id_card_number} onChange={formik.handleChange} />
      </div>

      <div className='flex flex-col relative'>
        <label htmlFor='phone'>เบอร์โทร</label>
        <input disabled="true" className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' name='phone' type='tel' value={formik.values.phone} onChange={formik.handleChange} />
        <button className="absolute translate-y-[38px] right-[4px] bg-black text-white px-3 py-[6px] rounded-[6px]" onClick={() => navigate("/update-phone") }>แก้ไข</button>
      </div>

      <div className='flex flex-col'>
        <label htmlFor='birth_date'>วัน/เดือน/ปีเกิด</label>
        <input
          className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]'
          type='date'
          name='birth_date'
          value={formik.values.birth_date}
          onChange={formik.handleChange}
        />
      </div>
      <footer className="w-full">
        <button type="submit" onClick={setIsSaving} className={`block mt-5 w-1/2 text-white rounded-[9px] p-3 w-full flex items-center justify-center gap-x-4 inter`} style={{ background: "linear-gradient(133.91deg, #F16A28 1.84%, #F9A30F 100%)", fontFamily: "Eventpop" }}>
          บันทึก
        </button>
      </footer>
    </form>
  )
}
