import { useRef, useState } from "react"
import { ArrowLeft, MarkerPin01 } from '@untitled-ui/icons-react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import {  useNavigate } from "react-router-dom";


const Phonverify = () => {
  const [filledInfo, setFilledInfo] = useState(false)
  const [userphone, Setuserphone] = useState('');
  const [show, setShow] = useState("false");
  const [disabled, setDisabled] = useState(false);
  const [myotp, setmyotp] = useState('');
  const [errornow, seterrornow] = useState('');
  const navigate = useNavigate();


  const handleChange = event => {
    const value = event.target.value.replace(/\D/g, "");
    Setuserphone(value);
  };

  const handleotpchange = event => {
    const value = event.target.value.replace(/\D/g, "");
    setmyotp(value);
  };

  const clickverify = (value) => {
    if(userphone.length > 7){
      phonverifynow(userphone);
      setShow()
      setDisabled(true)
    } 
  }


  const verifyotp = () => {
    verifyotpnow(userphone,myotp,Cookies.get('username'))
  }


const phonverifynow = (phone) => {
    try {
        return fetch("https://dev.zaviago.com/api/method/honda_api.api_calls.verifyuser.getphone?userphone="+phone, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => response.json()).then((data) => {
          var res = data.message;

          if(res.status == 'success'){
            seterrornow('');
            seterrornow(res.message);
          }
          else{
              seterrornow(res.message);
              setShow('false')
              setDisabled(false)
          }

        })

    } catch (error) {
        return error;
    }
}
const verifyotpnow = (userphone,myotp,username) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");
  myHeaders.append("Authorization", "Bearer "+Cookies.get('token'));


  var requestOptions = {
      method: 'POST',
      headers: myHeaders
  };
  fetch("https://dev.zaviago.com/api/method/honda_api.api_calls.verifyuser.verifyotp?userphone="+userphone+"&otp="+myotp+"&username="+username, requestOptions)
  .then((response) => response.json()).then((data) => {
    var res = data.message;

    if(res.status == 'success'){
      seterrornow('');
      seterrornow(res.message);
      Cookies.set('phoneverify', false); 
      navigate("/");
    }
    else{
        seterrornow(res.message);
        setShow('false')
        setDisabled(false)
    }

  })
  .catch(error => console.log('error', error));

}



  return (
    <>
   
      <main className='px-5 py-[46px]'>
          <div className='flex flex-col relative'>
              <div className="showerror">{errornow}</div>
              <label htmlFor='phone'>เบอร์โทร</label>
              <input className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]' onChange={handleChange} value={userphone} id='phone' name='phone' type='tel' disabled={disabled}/>
              <button onClick={clickverify} className="absolute translate-y-[38px] right-[4px] bg-black text-white px-3 py-[6px] rounded-[6px]">Send</button>
              
              
              <input  onChange={handleotpchange} value={myotp} className={`${show ? "invisible" : "visible"} border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]`} placeholder="OTP"  id='otp' name='otp' type='tel'/>
              <button onClick={verifyotp} className={`${show ? "invisible" : "visible"} text-white rounded-[9px] p-3 w-full bg-[#00A950] font-bold flex items-center justify-center mt-8`}>แจ้งโอนเงิน</button>
          </div>
      </main>
      <footer className='flex px-5 pb-5 gap-x-3'>
      </footer>
    </>
  )
}

export default Phonverify;