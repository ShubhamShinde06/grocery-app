import React, { useContext, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaUserCircle } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
// import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { CiMenuFries } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { userAuthStore } from "../store/authStore";
import { toast } from "react-toastify";
import { ShopContext } from "../Context/ShopContext";

const Header = (props) => {

  const {user} = userAuthStore()

  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const { logout } = userAuthStore();
  const [open, setOpne] = useState(false);
  const { cartCount, getCartAmount } = useContext(ShopContext);

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="w-full h-auto lg:h-20 shadow-2xl flex flex-col py-3 lg:py-0 lg:flex-row lg:items-center lg:justify-between px-2 lg:px-10 fixed top-0 bg-white z-10">
      <div
        className={`w-full lg:w-auto h-12 flex items-center lg:justify-normal justify-between`}
      >
        <Link to={"/home"}>
          <img src={"/logo.png"} alt="logo" className="w-40 h-[180px]" />
        </Link>
        <div
          onClick={() => setOpne(!open)}
          className="cursor-pointer text-3xl lg:hidden"
        >
          <FaUserCircle />
        </div>

        {open ? (
          <>
            <div className=" group-hover:block lg:hidden  absolute dropdown-menu right-3 top-10 py-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                {/* <p className=" cursor-pointer hover:text-black">My Profile</p> */}
                <p
                  onClick={() => navigate("/order")}
                  className=" cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                {
                    user
                    ?
                    <p
                    className=" cursor-pointer hover:text-black"
                    onClick={handleLogout}
                  >
                    Logout{" "}
                  </p>
                  :
                  <Link to={'/auth'}
                  className=" cursor-pointer hover:text-black"
                  
                >
                  Log in{" "}
                </Link>
                  }
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      <div
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
                className="bg-transparent w-full h-full outline-none"
                value={props.search}
                onChange={(e) => props.setSearch(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {/* big screnn */}
      <div className="flex items-center gap-6 ">
        <div className=" group relative lg:block hidden">
          <div
            onClick={() => setOpne(!open)}
            className="cursor-pointer text-3xl"
          >
            <FaUserCircle />
          </div>

          {open ? (
            <>
              <div className=" absolute dropdown-menu right-0 py-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                  {/* <p className=" cursor-pointer hover:text-black">My Profile</p> */}
                  <p
                    onClick={() => navigate("/order")}
                    className=" cursor-pointer hover:text-black"
                  >
                    Orders
                  </p>
                  {
                    user
                    ?
                    <p
                    className=" cursor-pointer hover:text-black"
                    onClick={handleLogout}
                  >
                    Logout{" "}
                  </p>
                  :
                  <Link to={'/auth'}
                  className=" cursor-pointer hover:text-black"
                  
                >
                  Log in{" "}
                </Link>
                  }
                  
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <Link to="/cart" className=" relative hidden lg:block">
          <button className="py-2 px-3 cursor-pointer border rounded-md text-white bg-[#F87E2E] flex gap-2 items-center font-bold">
            <div className="text-3xl">
              <TiShoppingCart />
            </div>
            <div className=" flex flex-col justify-center  h-full">
              <span className=" text-xs pl-0.5">{cartCount || 0} items</span>
              <span className=" font-bold text-xs">₹ {getCartAmount() || 0}</span>
            </div>
            {/* <span className="text-2xl">
              <TiShoppingCart />
            </span>
            <span>My Cart :- {cartCount}</span> */}
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
