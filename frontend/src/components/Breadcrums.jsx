import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { Link } from 'react-router-dom';

const Breadcrums = ({name}) => {

  return (
    <div className='flex items-center gap-[8px] text-[20px] font-[600] uppercase lg:mt-20 my-10 lg:px-12 px-4'>
        <AiFillHome /><Link to="/home">HOME </Link><IoIosArrowForward /> {name} 
    </div>
  )
}

export default Breadcrums