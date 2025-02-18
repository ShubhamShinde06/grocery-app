import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <>
      <Link to={`/product/${props.id}`}>
        <div
          key={props.item}
          onClick={window.scrollTo(0,0)}
          className="w-[200px] h-70 mt-5 mr-3 shadow-xl border-[1.5px] border-[#E8E8E8] rounded-xl px-4 flex flex-col gap-3"
        >
          {/* product_img */}
          <div className="w-full h-1/2 flex items-center justify-center" ></div>
          {/* product_title */}
          <main>Amul Taaza Toned Fresh Milk</main>
          {/* product_Q */}
          <h1 className=" text-[#959595] font-normal">500ml</h1>
          {/* price & Add_to_cart */}
          <div className="w-full flex items-center justify-between py-2">
            <h1>₹28</h1>
            <button className=" px-4 py-1 rounded-md cursor-pointer text-sm border border-[#318616] text-[#3B8C21] font-semibold bg-[#dbfee4]">
              ADD
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
