import * as Yup from 'yup';

export const userInfoSchema = Yup.object().shape({
    first_name: Yup.string().required('กรุณากรอกชื่อ'),
    last_name: Yup.string().required('กรุณากรอกนามสกุล'),
    id_card_number: Yup.string().required('กรุณากรอกเลขบัตรประจำตัวประชาชน'),
    birth_date: Yup.date().required('กรุณากรอกข้อมูลให้ครบถ้วน'),
    // phone: Yup.string().required('Phone is required'),
});
