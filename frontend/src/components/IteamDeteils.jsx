import React from "react";
import Header from "./Header";
import Breadcrums from "./Breadcrums";
import Footer from "./Footer";

const IteamDeteils = () => {
  return (
    <>
      <div className="w-full h-full flex flex-col lg:gap-0 gap-20 py-10">
        <div>
          <Header />
        </div>
        <div>
          <Breadcrums name={"sine to"} />
          <div className="w-full lg:px-12 px-5 lg:mt-0 flex gap-10 lg:flex-row flex-col">
            <div className="flex gap-[10px] lg:flex-row flex-col-reverse">
              <div className="flex lg:flex-col flex-row gap-[10px] overflow-x-scroll lg:overflow-x-hidden">
                <img
                  className="shadow-xl lg:min-w-38  lg:mr-3 lg:h-42 w-32 h-38"
                  src={""}
                  alt=""
                />
                <img
                  className="shadow-xl lg:min-w-38  lg:mr-3 lg:h-42 w-32 h-38"
                  src={""}
                  alt=""
                />
                <img
                  className="shadow-xl lg:min-w-38  lg:mr-3 lg:h-42 w-32 h-38"
                  src={""}
                  alt=""
                />
                <img
                  className="shadow-xl lg:min-w-38  lg:mr-3 lg:h-42 w-32 h-38"
                  src={""}
                  alt=""
                />
              </div>
              <div className="w-full">
                <img
                  className=" lg:w-[506px] lg:h-[700px] w-full h-[400px] shadow"
                  src={""}
                  alt=""
                />
              </div>
            </div>
            <div className="right lg:mx-[40px] flex flex-col">
              <h1 className="text-[#3d3d3d3] lg:text-[40px] text-[35px] font-[700]">
                Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse
              </h1>
              <div className="prices flex my-[30px] gap-[30px] text-[24px] font-[700]">
                <div className="text-[#818181] line-through">₹{"180"}</div>
                <div className="text-[#f87e2ddd]">₹{"69"}</div>
              </div>
              <div className="font-normal text-xl">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus
                dicta a sed recusandae sequi nisi, reprehenderit sit quasi
                officia dolorem.
              </div>
              <div className="size">
                <h1 className="mt-[55px] text-[#656565] text-[20px] font-[600]">
                  Select Size
                </h1>
                <div className="right-size flex my-[30px] gap-[20px]">
                  <div className="py-[18px] px-[24px] bg-[#fbfbfb] border border-[#ebebeb] rounded-[3px] cursor-pointer">
                    S
                  </div>
                  <div className="py-[18px] px-[24px] bg-[#fbfbfb] border border-[#ebebeb] rounded-[3px] cursor-pointer">
                    M
                  </div>
                  <div className="py-[18px] px-[24px] bg-[#fbfbfb] border border-[#ebebeb] rounded-[3px] cursor-pointer">
                    L
                  </div>
                  <div className="py-[18px] px-[24px] bg-[#fbfbfb] border border-[#ebebeb] rounded-[3px] cursor-pointer">
                    XL
                  </div>
                  <div className="py-[18px] px-[24px] bg-[#fbfbfb] border border-[#ebebeb] rounded-[3px] cursor-pointer">
                    XXL
                  </div>
                </div>
              </div>
              <button className="py-[20px] px-[40px] text-[16px] font-[600] border text-[#FFFFFF] bg-[#f87e2ddd] mb-[40px] cursor-pointer rounded-md">
                ADD TO CART
              </button>
              <p className="right-cat mt-[10px] ">
                <span className="font-[600]">Category : </span>
                Women, T-Shirt, Crop TOP
              </p>
              <p className="right-cat mt-[10px]">
                <span className="font-[600]">Tags : </span>
                Modren, Latest
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IteamDeteils;
