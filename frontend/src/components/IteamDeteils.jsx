import React from "react";
import Header from "./Header";
import Breadcrums from "./Breadcrums";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useState } from "react";
import RelatedItem from "./RelatedItem";

const IteamDeteils = () => {
  const { id } = useParams();
  const { products } = useContext(ShopContext);

  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products?.map((item) => {
      if (item._id === id) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [id, products]);

  return (
    <>
      <div className="w-full  flex flex-col lg:gap-0 gap-20 py-10">
        <div>
          <Header />
        </div>
        <div>
          <div className=" lg:mt-20 mt-10 lg:px-10 px-3">
            <Breadcrums title={"Product"} name={productData.name} />
          </div>

          <div className="w-full lg:px-12 px-5 lg:mt-10 mt-5 flex gap-10 lg:flex-row flex-col">
            <div className="flex gap-[10px] lg:flex-row flex-col-reverse">
              <div className="flex lg:flex-col flex-row gap-[10px] overflow-x-scroll lg:overflow-x-hidden">
                {productData.image?.map((item, index) => (
                  <img
                    className="shadow-xl lg:min-w-40 lg:mr-3 lg:h-42 w-32 h-38"
                    src={item}
                    key={index}
                    onClick={() => setImage(item)}
                    alt="img"
                  />
                ))}
              </div>
              <div className="w-full">
                <img
                  className=" lg:min-w-[500px] lg:h-[700px] w-full h-[400px] shadow"
                  src={image}
                  alt="productIMg"
                />
              </div>
            </div>
            <div className="right lg:mx-[40px] flex flex-col">
              <h1 className="text-[#3d3d3d3] lg:text-[40px] text-[20px] font-[700]">
                {productData.name}
              </h1>
              <h1 className="text-[#3d3d3d3] lg:text-[20px] text-[20px] font-[700] flex gap-2">
                Shop name :-
                <Link
                  to={`/shop/${productData?.shopkeeper?._id}`}
                  className=" cursor-pointer text-[#818181]"
                >
                  {productData?.shopkeeper?.shopName}
                </Link>
              </h1>
              <div className="prices flex my-[30px] gap-[30px] text-[24px] font-[700]">
                <div className="text-[#818181] line-through">
                  ₹{productData.price}
                </div>
                <div className="text-[#f87e2ddd]">₹{productData.discount}</div>
              </div>
              <div className="font-normal lg:text-xl text-sm">
                {productData.description}
              </div>
              <div className="size">
                <h1 className="mt-[55px] text-[#656565] text-[20px] font-[600]">
                  Select Quantity
                </h1>
                <div className="flex gap-2 my-[20px]">
                  {productData.quantity?.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSize(item)}
                      className={`border py-2 px-4 bg-gray-100 ${
                        item === size ? " border-orange-500" : ""
                      }`}
                    >
                      {item} {productData.unit}
                    </button>
                  ))}
                </div>
              </div>
              <button className="py-[20px] px-[40px] text-[16px] font-[600] border text-[#FFFFFF] bg-[#f87e2ddd] mb-[40px] cursor-pointer rounded-md">
                ADD TO CART
              </button>
              <p className="right-cat mt-[10px] ">
                <span className="font-[600]">Category : </span>
                {productData.category?.map((item, index) => (
                  <>{item.name}</>
                ))}
              </p>
              <p className="right-cat mt-[10px]">
                <span className="font-[600]">Tags : </span>
                {productData.subCategory?.map((item, index) => (
                  <>{item.name}</>
                ))}
              </p>
            </div>
          </div>
        </div>
        <RelatedItem
          category={productData.category?.[0].name}
          subCategory={productData.subCategory?.[0].name}
        />
      </div>
    </>
  );
};

export default IteamDeteils;
