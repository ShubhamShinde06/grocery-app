import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";
import { userAuthStore } from "../store/authStore";

const Search = () => {
  const { products } = useContext(ShopContext);
  const { user } = userAuthStore();

  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [selectedSizes, setSelectedSizes] = useState({});
  
    const handleSizeClick = (productId, size) => {
      setSelectedSizes((prev) => ({
        ...prev,
        [productId]: size,
      }));
    };

  const applyFilter = () => {
    if (!products || !Array.isArray(products)) return;

    let filtered = products.filter(
      (item) =>
        (item.name &&
          typeof item.name === "string" &&
          item.name.toLowerCase().includes(inputValue.toLowerCase())) ||
        ""
      // (item.category &&
      //   Array.isArray(item.category) &&
      //   item.category.some(
      //     (cat) =>
      //       typeof cat.name === "string" &&
      //       cat.name.toLowerCase().includes(inputValue.toLowerCase())
      //   ))
    );

    setFilteredData(filtered);
  };

  useEffect(() => {
    applyFilter();
  }, [inputValue, products]);

  return (
    <div className=" w-full h-full">
      <div>
        <Header search={inputValue} setSearch={setInputValue} />
      </div>
      <div className="w-full h-[calc(100vh-20vh)]lg:mt-25 mt-40 lg:px-10 pl-2">
        <div className="grid xl:grid-cols-7 gap-1 lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item._id}
                className="w-[200px] h-70 mt-5 shadow-xl border-[1.5px] border-[#E8E8E8] rounded-xl px-4 flex flex-col justify-around gap-2"
              >
                {/* product_img */}
                <Link
                  to={`/product/${item._id}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="w-full h-1/2 flex items-center justify-center"
                >
                  <img
                    src={item.image?.[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </Link>
                {/* product_title */}
                <main className="doted-text">{item.name}</main>
                {/* product_Q */}
                <div className="text-[#959595] font-normal">
                  {item.quantity?.map((sizeOption, index) => (
                    <button
                      key={index}
                      onClick={() => handleSizeClick(item._id, sizeOption)}
                      className={`mr-1 py-0 px-2 cursor-pointer border-[0.5px] border-[#959595] rounded-md ${
                        selectedSizes[item._id] === sizeOption
                          ? " bg-[orange] text-white border-none"
                          : ""
                      }`}
                    >
                      {sizeOption}
                    </button>
                  ))}
                  {item.unit}
                </div>
                {/* price & Add_to_cart */}
                <div className="w-full flex items-center justify-between py-2">
                  <div className="prices flex items-center my-[0px] gap-[10px] text-[16px] font-[700]">
                    <div className="text-[#818181] line-through text-[14px]">
                      ₹{item.price}
                    </div>
                    <div className="text-[#f87e2ddd]">
                      ₹{item.discount}
                    </div>
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
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600 text-lg font-semibold mt-5 h-[70vh]">
              This Product is not available!
            </div>
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Search;
