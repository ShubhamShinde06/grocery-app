import React from "react";
import Card from "./Card";
import Cards from "./Cards";

const RelatedItem = () => {
  const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
    { id: 4, name: "Item 4" },
    { id: 4, name: "Item 4" },
    { id: 4, name: "Item 4" },
  ];

  return (
    <div className="flex flex-col item-center gap-[10px] h-auto lg:px-10 px-5 py-10 w-[100%] ">
      <div className="text-center flex flex-col items-center">
        <h1 className="text-[#171717] lg:text-[50px] text-[35px] font-[600] text-center">
          Related Products
        </h1>
        <hr className="w-[200px] h-[6px] rounded-[10px] bg-[#252525]" />
      </div>
      <div className="lg:mt-[50px] mt-[30px] lg:px-6 scroll-hover">
        <Cards Data={items} />
      </div>
    </div>
  );
};

export default RelatedItem;
