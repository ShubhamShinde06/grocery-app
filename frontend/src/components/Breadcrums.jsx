import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import arrow_icon from '../assets/breadcrum_arrow.png'

const Breadcrums = ({ name, title }) => {
  return (
    <div className='flex items-center gap-[8px] text-[18px] font-[600] uppercase '>
        <Link to="/">HOME</Link> <img src={arrow_icon} alt="" />
        {title} <img src={arrow_icon} alt="" />
        <p className="doted-text line-clamp-2 h-7">{name}</p>
    </div>
  );
};

export default Breadcrums;
