import React, { useContext } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";

const CartFooter = () => {

    const {cartCount, getCartAmount} = useContext(ShopContext)

  return (
    <div className="flex h-full bg-[#F87E2E] items-center justify-between text-white font-[600] py-2 px-3 rounded-xl">
      <div className="flex items-center gap-2 h-full">
        <div className=" w-12 h-full backdrop-blur-3xl bg-white/40 rounded-md flex items-center justify-center text-3xl">
          <TiShoppingCart />
        </div>
        <div className=" flex flex-col justify-center  h-full">
            <span className=" text-xs pl-0.5">{cartCount} items</span>
            <span className=" font-bold">₹ {getCartAmount() || 0}</span>
        </div>
      </div>
    <Link to={'/cart'} className="text-1xl" onClick={()=>window.scrollTo(0,0)}>View Cart {'>'}</Link>
    </div>
  );
};

export default CartFooter;
