import React from "react";
import { Link } from "react-router-dom";
import { userAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Card = (props) => {
  const { user } = userAuthStore();
  const navigate = useNavigate();
  const [size, setSize] = useState("");

  return (
    <>
      <div>
        <div
          key={props.index}
          className="w-[200px] h-70 mt-5 mr-3 shadow-xl border-[1.5px] border-[#E8E8E8] rounded-xl px-4 flex flex-col justify-around gap-2"
        >
          {/* product_img */}
          <Link
            to={`/product/${props.id}`}
            onClick={() => window.scrollTo(0, 0)}
            className="w-full h-1/2 flex items-center justify-center"
          >
            <img
              src={props.image?.[0]}
              alt={props.name}
              className="w-full h-full object-cover"
            />
          </Link>
          {/* product_title */}
          <main className="doted-text">{props.name}</main>
          {/* product_Q */}
          <h1 className=" text-[#959595] font-normal">
            {props.quantity?.map((item, index) => (
              <button
                key={index}
                onClick={() => setSize(item)}
                className={`mr-1 py-0 px-2 bg-gray-50 ${
                  item === size ? " border-orange-500 border" : ""
                }`}
              >
                {item} {props.unit}
              </button>
            ))}
          </h1>
          {/* price & Add_to_cart */}
          <div className="w-full flex items-center justify-between py-2">
            <div className="prices flex items-center my-[0px] gap-[10px] text-[16px] font-[700]">
              <div className="text-[#818181] line-through text-[14px]">
                ₹{props.price}
              </div>
              <div className="text-[#f87e2ddd]">₹{props.discount}</div>
            </div>
            {!user ? (
              <button
                onClick={() => navigate("/auth")}
                className=" px-4 py-1 rounded-md cursor-pointer text-sm border text-[#FFFFFF] font-semibold bg-[#f87e2ddd] hover:shadow"
              >
                {"ADD"}
              </button>
            ) : (
              <button className=" px-4 py-1 rounded-md cursor-pointer text-sm border text-[#FFFFFF] font-semibold bg-[#f87e2ddd] hover:shadow">
                {"ADD"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
