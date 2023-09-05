import { Link, useParams } from "react-router-dom";
import { SfIconSearch, SfIconArrowForward, SfIconCalendarToday } from '@storefront-ui/react'

const BlogCard = ({title, image, date, link}) => {
  return (
    <>
    <Link to={`/single-blog/${link}`} className="min-w-[300px] max-w-[300px]">
    <h2 className='text-[#3D3D3D] font-bold flex items-center mb-[5px] leading-6'>
      เข้าร่วมเลย
      <SfIconArrowForward className="w-[18px] text-black ml-2" />
    </h2>
      <img src={image} className="rounded-[6px]"/>
      <h2 className='mt-4 whitespace-normal text-[#1C1C1C] text-sm font-bold pr-7'>{title}</h2>

      <p className='text-[#8A8A8A] mt-[5px] text-xs flex items-center'>
        <SfIconCalendarToday className="w-[11px] mr-[6px]"/>
        หมดเขต {date}
      </p>
    </Link>
    </>
  )
}
export default BlogCard