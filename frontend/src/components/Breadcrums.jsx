import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import arrow_icon from '../assets/breadcrum_arrow.png'

const Breadcrums = ({ name, title }) => {
  return (
    <div className='flex items-center gap-[8px] text-[18px] font-[600] lg:mt-[70px] mb-5 mt-10 px-5 lg:px-10 uppercase '>
        HOME <img src={arrow_icon} alt="" />
        {title} <img src={arrow_icon} alt="" />
        <p className="doted-text">{name}</p>
    </div>
  );
};

export default Breadcrums;
