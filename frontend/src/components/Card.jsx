import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAuthStore } from "../store/authStore";
import { ShopContext } from "../Context/ShopContext";

const Card = (props) => {
  const { user } = userAuthStore();
  const userId = user?._id
  const navigate = useNavigate();
  const [size, setSize] = useState(null);
  const [finalPrice, setFinalPrice] = useState(0);
  const {addToCart} = useContext(ShopContext)

  useEffect(() => {
    setFinalPrice(props.discount); // Default price
  }, [props]);

  const handleSizeSelection = (selectedSize) => {
    setSize(selectedSize);
    setFinalPrice(props.discount * selectedSize);
  };

  return (
    <div key={props} className="w-[220px] bg-white hover:shadow-xl rounded-xl p-4 flex flex-col justify-between gap-3 transition-all duration-300">
      {/* Product Image */}
      <Link
        to={`/product/${props.id}`}
        onClick={() => window.scrollTo(0, 0)}
        className="relative w-full h-40 flex items-center justify-center"
      >
        <img
          src={props.image?.[0]}
          alt={props.name}
          className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform duration-200"
        />
      </Link>

      {/* Product Title */}
      <h2 className="text-lg font-semibold text-gray-800 truncate">
        {props.name}
      </h2>

      {/* Size Selection */}
      <div className="flex gap-2 flex-wrap">
        {props.quantity?.map((item, index) => (
          <button
            key={index}
            onClick={() => handleSizeSelection(item)}
            className={`px-2 py-1 text-sm border rounded-md ${
              item === size ? " border-none bg-orange-100 " : "bg-gray-50"
            }`}
          >
            {item}
          </button>
        ))}
        <div className="py-1 px-1 rounded-md bg-gray-50">{props.unit}</div>
      </div>

      {/* Price & Add to Cart */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 line-through">
            ₹{size === null ? props.price : props.price * size}
          </span>
          <span className="text-lg font-bold text-orange-500">
            ₹{finalPrice}
          </span>
        </div>

        <button
          onClick={() =>
            user ? addToCart(userId, props.id, size, finalPrice, props.shopId) : navigate("/auth")
          }
          className="px-4 py-2 cursor-pointer text-sm font-semibold text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-all"
        >
          ADD
        </button>
      </div>
    </div>
  );
};

export default Card;
