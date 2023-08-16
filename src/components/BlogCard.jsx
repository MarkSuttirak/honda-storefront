import { Link } from "react-router-dom";
import { SfIconSearch, SfIconArrowForward, SfIconCalendarToday } from '@storefront-ui/react'

const BlogCard = ({title, image, date, link}) => {
  return (
    <Link to='/single-blog' className="min-w-[300px] max-w-[300px]">
      <img src={image} />
      <h2 className='mt-4 whitespace-normal text-[#1C1C1C] text-sm font-bold pr-7'>{title}</h2>

      <p className='text-[#8A8A8A] mt-[5px] text-xs flex items-center'>
        <SfIconCalendarToday className="w-[11px] mr-[6px]"/>
        หมดเขต {date}
      </p>
    </Link>
  )
}

  export default BlogCard