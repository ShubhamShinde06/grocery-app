import React from "react";
import Header from "./Header";

const CartTotal = () => {
  return (
    <>
      <div className="w-full">
        <div className="text-2xl">
          {/* Title */}
          <div className=" inline-flex gap-2 items-center mb-3">
            <p className="text-gray-500">
              {"CART"}{" "}
              <span className="text-gray-700 font-medium">{"TOTAL"}</span>
            </p>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
          </div>
        </div>
        {/* totle */}
        <div className=" flex flex-col gap-2 mt-2 text-sm">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>.00</p>
          </div>

          <div className="flex justify-between">
            <p>Shipping Fee</p>
            <p>.00</p>
          </div>

          <div className="flex justify-between">
            <p>Total</p>
            <p>
              {"₹"}
              .00
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartTotal;
