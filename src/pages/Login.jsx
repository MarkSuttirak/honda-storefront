import { useState, Fragment } from "react";
import { SfInput, SfButton } from '@storefront-ui/react';
import { useFormik } from 'formik';
import { useFrappeAuth, useFrappeGetCall, useFrappeGetDoc } from 'frappe-react-sdk';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { getToken } from '../utils/helper';
import bgBrand from '../img/background-login.png'
import hondaHomeLogo from '../img/honda-home-logo.svg'
import { Dialog, Transition } from '@headlessui/react'

export default function Login() {
  document.body.style.background = `url(${bgBrand})`;
  const { login } = useUser();
  const [lineurl, setlineurl] = useState("");
  const navigate = useNavigate();
  const { data } = useFrappeGetCall('/honda_api.api_calls.linetoken.get_oauth2_authorize_url', null, ``)

  const line = async (usr, pwd) => {
    try {
      return fetch("https://dev.honda.zaviago.com/api/method/honda_api.api_calls.linetoken.get_oauth2_authorize_url?" + Date.now(), { method: "GET", headers: { "Content-Type": "application/json" } }).then((response) => response.json()).then((data) => {
        setlineurl(data.message);
      })
    } catch (error) {
      return error;
    }
  }

  const { data:dataConsent, isLoading:loadConsent, error:errorConsent } = useFrappeGetDoc('Terms and Conditions Document', {
    fields: ['description']
  })

  const {
    isLoading,
  } = useFrappeAuth();

  useEffect(() => {
    if (getToken()) {
      navigate("/");
    }
    line();
  }, [])

  const formik = useFormik({
    initialValues: {
      usr: 'suttirak.ch@zaviago.com',
      pwd: 'CanDoNa12a3',
      // usr: 'suttirak.ch@zaviago.com',
      // pwd: 'Markchar123%',
    },
    onSubmit: values => login(values.usr, values.pwd).then(() => navigate("/"))
  });

  function handleClick(e) {
    const url = window.location.href = lineurl
    navigate(url)
  }

  return (
    <>
      <div className="flex flex-col justify-center h-screen w-full">
        <header>
          <img src={hondaHomeLogo} className="w-[200px] mx-auto mt-10" />
          <article className="text-center text-white p-5">
            <h1 className="text-[32px] font-bold">ยินดีต้อนรับ</h1>
            <h1 className="text-[32px] font-bold">Hondanont Loyalty</h1>
            <p className="mt-4">ลงทะเบียนวันนี้ เริ่มสะสมคะแนนจากทุกการใช้จ่าย แลกส่วนลด และสิทธิ์พิเศษที่เหนือกว่าใคร แทนคำขอบคุณที่ไว้วางใจ</p>
          </article>
        </header>
        <form className="p-4 flex gap-4 flex-wrap text-neutral-900 text-start" onSubmit={formik.handleSubmit}>
          {/* <h2 className="w-full typography-headline-4 md:typography-headline-3 font-bold">Sign in</h2> */}
            {/* <label className="w-full flex flex-col gap-0.5">
              <span className="typography-text-sm  font-medium">usr/username</span>
              <SfInput name="usr" type='email' autoComplete="usr" required onChange={formik.handleChange} value={formik.values.usr} className='focus:ring-[#F0592A] hover:ring-[#F0592A] focus-within:ring-[#F0592A] active:ring-[#F0592A]'/>
            </label>
            <label className="w-full flex flex-col gap-0.5 flex flex-col gap-0.5">
              <span className="typography-text-sm font-medium">password</span>
              <SfInput name="pwd" type='password' autoComplete="given-password" required onChange={formik.handleChange} value={formik.values.pwd} className='focus:ring-[#F0592A] hover:ring-[#F0592A] focus-within:ring-[#F0592A] active:ring-[#F0592A]'/>
            </label>


            <div className="w-full flex gap-4 mt-4 md:mt-0">
              <SfButton className="w-full shadow-none" type='submit' style={{color:"#F0592A",fontWeight:"bold",backgroundColor:"white"}}>{isLoading ? 'กำลังโหลด...' : 'เข้าสู่ระบบ'}</SfButton>
            </div> */}
          <div className="w-full flex gap-4">
            <SfButton onClick={() => handleClick()} className="w-full shadow-none" type='button' style={{ color: "#F0592A", fontWeight: "bold", backgroundColor: "white" }}>{isLoading ? 'กำลังโหลด...' : 'เข้าสู่ระบบด้วย Line'}</SfButton>
          </div>
        </form>
      </div>

    
    </>
  );
}
