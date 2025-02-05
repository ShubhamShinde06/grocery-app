import React from "react";
import { FaTachometerAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { BiSolidCategory, BiSolidCategoryAlt } from "react-icons/bi";
import { IoIosAddCircleOutline } from "react-icons/io";

const Sidebar = () => {
  return (
    <div className="lg:w-[250px] w-[80px] h-full shadow-xl flex flex-col gap-5 py-10 pl-4 items-end">
      <NavLink
        to={"/home"}
        className={
          "py-2 px-2 w-full rounded-l-2xl text-center shadow text-xl hover:scale-105 duration-300 tracking-wide"
        }
      >
        <h1 className=" lg:block hidden">Dashborad</h1>
        <h1 className=" block lg:hidden ml-3">
          <FaTachometerAlt />
        </h1>
      </NavLink>

      <NavLink
        to={"/category"}
        className={
          "py-2 px-2 w-full rounded-l-2xl text-center shadow text-xl hover:scale-105 duration-300 tracking-wide"
        }
      >
        <h1 className=" lg:block hidden">Categorys</h1>
        <h1 className=" block lg:hidden ml-3">
          <BiSolidCategory />
        </h1>
      </NavLink>

      <NavLink
        to={"/sub-category"}
        className={
          "py-2 px-2 w-full rounded-l-2xl text-center shadow text-xl hover:scale-105 duration-300 tracking-wide"
        }
      >
        <h1 className=" lg:block hidden">SubCategorys</h1>
        <h1 className=" block lg:hidden ml-3">
          <BiSolidCategoryAlt />
        </h1>
      </NavLink>

      <NavLink
        to={"/product"}
        className={
          "py-2 px-2 w-full rounded-l-2xl text-center shadow text-xl hover:scale-105 duration-300 tracking-wide"
        }
      >
        <h1 className=" lg:block hidden">Products</h1>
        <h1 className=" block lg:hidden ml-3">
          <IoIosAddCircleOutline />
        </h1>
      </NavLink>
    </div>
  );
};

export default Sidebar;
