import { useNavigate } from 'react-router-dom'
import { useFormik } from "formik"
import { useFrappePostCall } from "frappe-react-sdk"
import { useEffect,useState, Fragment } from 'react'
import { useUser } from '../../hooks/useUser'
import { userInfoSchema } from '../../components/forms/userInfoSchema'
import { Dialog, Transition } from '@headlessui/react'
import { getToken,removeToken } from "./../../utils/helper";



const FillInfo = () => {
  const navigate = useNavigate()
  const { user, refetch } = useUser()
  const { call, isCompleted, loading } = useFrappePostCall("honda_api.api_calls.getuser.update_profile")
  const [pdpa, setPdpa] = useState(true);
  const [acceptPdpa, setAcceptPdpa] = useState(false);
  useEffect(() => {
    if (isCompleted) {
      refetch().then(() => navigate("/phonverify"))
    }
  }, [isCompleted])
  useEffect(() => {
    refetch();
  }, [])

  useEffect(() => {
    const token = getToken();
    if (token === "undefined" || !token) {
      navigate("/login");
      return;
    }
  });



  return (
    <main className='px-5 py-[46px]'>
      <h1 className='text-[22px] font-bold'>ข้อมูลส่วนตัว</h1>
      <p className='mt-4'>กรอกข้อมูลเพิ่มเติมโดยข้อมูลเหล่านี้<br /> จะแสดงอยู่ในหน้าบัญชีของคุณ</p>
      {
        user && (
          <UserInfoForm
            validationSchema={userInfoSchema}
            initialValues={{
              first_name: user?.user.full_name.split(" ")[0],
              last_name: user?.user.full_name.split(" ").slice(1).join(" "),
              email: user?.user.user_email,
              phone: user?.user.phone,
              id_card_number: user?.user.id_card_number,
              birth_date: user?.user.birth_date,
            }}
            onSubmit={call}
            isLoading={loading}
            pdpa={pdpa}
            setPdpa={setPdpa}
            acceptPdpa={acceptPdpa}
            setAcceptPdpa={setAcceptPdpa}
          />
        )
      }
    </main>
  )
}

export default FillInfo

export const UserInfoForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  isLoading,
  pdpa,
  setPdpa,
  acceptPdpa,
  setAcceptPdpa
}) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit
  })
  return (
    <>
    <form className="flex flex-col gap-y-5" onSubmit={formik.handleSubmit}>
      <div className='flex flex-col'>
        <label htmlFor='first_name'>ชื่อ <span className='text-negative-700'>*</span></label>
        <input
          className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]'
          name='first_name'
          value={formik.values.first_name}
          onChange={formik.handleChange}
        />
        {
          formik.errors.first_name && (
            <strong className="typography-error-sm text-negative-700 font-medium">{formik.errors.first_name}</strong>
          )
        }
      </div>

      <div className='flex flex-col'>
        <label htmlFor='last_name'>นามสกุล <span className='text-negative-700'>*</span></label>
        <input
          className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]'
          name='last_name'
          value={formik.values.last_name}
          onChange={formik.handleChange}
        />
        {
          formik.errors.last_name && (
            <strong className="typography-error-sm text-negative-700 font-medium">{formik.errors.last_name}</strong>
          )
        }
      </div>

      <div className='flex flex-col'>
        <label htmlFor='email'>อีเมลของคุณ</label>
        <input
          className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]'
          type='email'
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {
          formik.errors.email && (
            <strong className="typography-error-sm text-negative-700 font-medium">{formik.errors.email}</strong>
          )
        }
      </div>

      <div className='flex flex-col'>
        <label htmlFor='id_card_number'>เลขบัตรประจำตัวประชาชน <span className='text-negative-700'>*</span></label>
        <input
          className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]'
          name='id_card_number'
          value={formik.values.id_card_number}
          onChange={formik.handleChange}
        />
        {
          formik.errors.id_card_number && (
            <strong className="typography-error-sm text-negative-700 font-medium">{formik.errors.id_card_number}</strong>
          )
        }
      </div>

      <div className='flex flex-col'>
        <label htmlFor='birth_date'>วัน/เดือน/ปีเกิด <span className='text-negative-700'>*</span></label>
        <input
          className='border border-[#E3E3E3] rounded-[8px] outline-none py-2 px-3 mt-[11px]'
          type="date"
          name='birth_date'
          value={formik.values.birth_date}
          onChange={formik.handleChange}
        />
        {
          formik.errors.birth_date && (
            <strong className="typography-error-sm text-negative-700 font-medium">{formik.errors.birth_date}</strong>
          )
        }
      </div>

      <footer className='flex gap-x-3'>
        <button
          className={`w-full text-white rounded-[9px] p-3 text-center ${(!formik.isValid || isLoading) ? "bg-[#C5C5C5] border border-[#C5C5C5]" : "bg-[#111111] border border-[#111111]"}`}
          disabled={!formik.isValid || isLoading}
          type='submit'
        >{
            isLoading ? "กำลังโหลด..." : "ดำเนินการต่อ"
          }</button>
      </footer>
    </form>

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
