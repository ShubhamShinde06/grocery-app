import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Breadcrums from "../components/Breadcrums";
import { CiSearch } from "react-icons/ci";

const SubCategory = () => {
  return (
    <div className=" w-full h-full flex flex-col ">
      <div>
        <Header />
      </div>
      <div className=" w-full h-[calc(100vh-80px)] flex justify-between">
        <div>
          <Sidebar />
        </div>
        <div className=" w-full h-full px-5 py-12 ">
          <Breadcrums name={"Sub-Category"} />
          <div className=" w-full h-full mt-2 rounded-xl shadow overflow-scroll scroll-display lg:px-5 py-2 px-0">
            <div className="w-full flex items-center justify-between">
              <div className="w-1/3 h-12 flex items-center px-2 rounded-xl bg-gray-100">
                <CiSearch className="text-xl" />
                <input
                  type="text"
                  className="w-full h-full flex-1 px-2 outline-none"
                  placeholder="Serach..."
                />
              </div>

              <button class="bg-[#FF8035] w-1/6 cursor-pointer rounded-xl  text-xl text-white py-2 hover:scale-105 duration-300">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubCategory