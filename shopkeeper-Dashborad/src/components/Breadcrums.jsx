import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";

const Breadcrums = ({name}) => {



  return (
    <div className='flex items-center gap-[8px] text-[16px] font-[600] uppercase'>
        <AiFillHome /> HOME <IoIosArrowForward />
        {/* SHOP <img src={arrow_icon} alt="" /> */}
        {name}  {/*<IoIosArrowForward />  */}
    </div>
  )
}

export default Breadcrums