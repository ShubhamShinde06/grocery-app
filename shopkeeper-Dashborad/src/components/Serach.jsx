import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoAddOutline } from "react-icons/io5";

const Serach = ({open, setOpen}) => {
  return (
    <div className="w-full flex items-center justify-between px-2">
      <div className="lg:w-1/3 lg:h-12 h-10 flex items-center px-2 rounded-md lg:rounded-xl bg-gray-100">
        <CiSearch className="text-xl" />
        <input
          type="text"
          className="w-full h-full flex-1 px-2 outline-none"
          placeholder="Serach..."
        />
      </div>

      <button onClick={()=>setOpen(false)} className="bg-[#FF8035] w-1/6 cursor-pointer rounded-md lg:rounded-xl flex justify-center  text-xl text-white py-2 hover:scale-105 duration-300">
        <h1 className=" block lg:hidden">
          <IoAddOutline />
        </h1>
        <h1 className=" lg:block hidden">Add</h1>
      </button>
    </div>
  );
};

export default Serach;
