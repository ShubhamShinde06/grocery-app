import React, { useEffect } from "react";
import { CatAndSubStore } from "../store/CatAndSubStore";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Category = () => {
  const { CategoryGet, Data, isLoading } = CatAndSubStore();

  useEffect(() => {
    CategoryGet();
  }, []);

  return (
    <div className="w-full flex flex-wrap gap-5 justify-center">
      {isLoading ? (
        new Array(12).fill(null).map((_, index) => (
          <motion.div
            key={index + "loadingcategory"}
            className="bg-gray-200 rounded-lg p-4 min-h-[180px] w-[150px] md:w-[180px] flex flex-col items-center gap-2 shadow-md animate-pulse"
          >
            <div className="w-full h-[120px] bg-gray-300 rounded"></div>
            <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
          </motion.div>
        ))
      ) : (
        Data?.map((item, index) => (
          <Link
            to={`/filtered/${item._id}`}
            key={index}
            className="w-[100px] md:w-[180px] h-[180px] md:h-[220px] overflow-hidden rounded-lg shadow-md hover:shadow-lg transition duration-300"
            onClick={() => window.scrollTo(0, 0)}
          >
            <img
              src={item.image}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
          </Link>
        ))
      )}
    </div>
  );
};

export default Category;
