import React, { useEffect, useState } from "react";
import { CatAndSubStore } from "../store/CatAndSubStore";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Category = () => {
  const { CategoryGet, Data, isLoading } = CatAndSubStore();

  useEffect(() => {
    CategoryGet();
  }, []);


  return (
    <div className=" w-full flex flex-wrap gap-5 justify-center ">
      {isLoading ? (
        new Array(12).fill(null).map((c, index) => {
          return (
            <motion.div
              key={index + "loadingcategory"}
              className="bg-[#EDF4FF] rounded p-4 min-h-36 grid gap-2 shadow animate-pulse"
            >
              <div className="md:w-32 md:h-40 w-15 h-30 overflow-hidden"></div>
              <div className="bg-blue-100 h-8 rounded"></div>
            </motion.div>
          );
        })
      ) : (
        <>
          {Data?.map((item, index) => (
            <Link
              to={`/filtered/${item._id}`}
              key={index + 1}
              className="md:w-32 md:h-40 w-15 h-30 overflow-hidden"
            >
              <img
                src={item.image}
                alt=""
                className="w-full h-full object-cover"
                onClick={() => window.scrollTo(0, 0)}
              />
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default Category;
