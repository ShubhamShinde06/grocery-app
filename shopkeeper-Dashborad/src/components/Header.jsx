import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaUserCircle } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
// import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { CiMenuFries } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { useAuthStore } from "../Store/authStore";
// import { TypeAnimation } from "react-type-animation";

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  // const [ isMobile ] = useMobile()
  const params = useLocation();
  const searchText = params.search.slice(3);

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    const url = `/search?q=${value}`;
    navigate(url);
  };

  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="w-full h-auto lg:h-20 shadow-2xl flex flex-col py-3 lg:py-0 lg:flex-row lg:items-center lg:justify-between px-2 lg:px-10">
      <div
        className={`w-full lg:w-auto h-12 flex items-center lg:justify-normal justify-between`}
      >
        <img src={"/logo-b.png"} alt="logo" className="w-50 h-50" />
        <Link to={"/"}>
          <div className=" lg:hidden cursor-pointer text-3xl mr-2">
            <FaUserCircle />
          </div>
        </Link>
      </div>

      {/* <div
        className={` px-2 min-w-[320px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200 mt-3 mx-2 lg:mx-0 lg:mt-0`}
      >
        <div>
          <CiSearch className={`text-2xl font-bold mr-2`} />
        </div>
        <div className="w-full h-full">
          {!isSearchPage ? (
            <div
              onClick={redirectToSearchPage}
              className="w-full h-full flex items-center px-2"
            >
              <TypeAnimation
                sequence={[
                  'Search "milk"',
                  1000, 
                  'Search "bread"',
                  1000,
                  'Search "sugar"',
                  1000,
                  'Search "panner"',
                  1000,
                  'Search "chocolate"',
                  1000,
                  'Search "curd"',
                  1000,
                  'Search "rice"',
                  1000,
                  'Search "egg"',
                  1000,
                  'Search "chips"',
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
          ) : (
            <div className="w-full h-full">
              <input
                type="text"
                placeholder="Search for atta dal and more."
                autoFocus
                defaultValue={searchText}
                className="bg-transparent w-full h-full outline-none"
                onChange={handleOnChange}
              />
            </div>
          )}
        </div>
      </div> */}

      <div className="flex items-center gap-6 ">
        <div className=" group relative lg:block hidden">
          <Link to={"/"}>
            <div className="cursor-pointer text-3xl">
              <FaUserCircle />
            </div>
          </Link>
          <div className=" group-hover:block hidden absolute dropdown-menu right-0 py-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              {/* <p className=" cursor-pointer hover:text-black">My Profile</p>
              <p className=" cursor-pointer hover:text-black">Orders</p> */}
              <p
                className=" cursor-pointer hover:text-black"
                onClick={handleLogout}
              >
                Logout{" "}
              </p>
            </div>
          </div>
        </div>
        {/* <Link to="/" className=" relative hidden lg:block">
          <div className="w-8 min-w-5 text-3xl">
            <TiShoppingCart />
          </div>
          <p className="absolute top-0 right-0 w-4 text-center leading-4 bg-[#32E80F] aspect-square rounded-full text-[8px]">
            1
          </p>
        </Link> */}
      </div>
    </header>
  );
};

export default Header;
