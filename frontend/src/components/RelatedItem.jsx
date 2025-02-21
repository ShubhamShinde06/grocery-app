import React from "react";
import Card from "./Card";
import Cards from "./Cards";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useEffect } from "react";
import { useState } from "react";

const RelatedItem = ({ category, subCategory }) => {

  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (!category || products.length === 0) return; // Ensure category exists before filtering
  
    const filteredProducts = products.filter((item) => 
      item.category?.some((c) => c?.name?.includes(category)) &&
      item.subCategory?.some((sc) => sc?.name?.includes(subCategory))
    );
  
    setRelated(filteredProducts);
  }, [products, category, subCategory]); // Added category & subCategory to dependencies
  

  return (
    <div className="flex flex-col item-center gap-[10px] h-auto lg:px-10 px-5 py-10 w-[100%] ">
      <div className="text-center flex flex-col items-center">
        <h1 className="text-[#171717] lg:text-[50px] text-[35px] font-[600] text-center">
          Related Products
        </h1>
        <hr className="w-[200px] h-[6px] rounded-[10px] bg-[#252525]" />
      </div>
      <div className="lg:mt-[50px] mt-[30px] lg:px-6 scroll-hover">
        <Cards Data={related} />
      </div>
    </div>
  );
};

export default RelatedItem;
