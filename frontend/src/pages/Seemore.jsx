import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Breadcrums from "../components/Breadcrums";
import Footer from "../components/Footer";
import { useProductStore } from "../store/productStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { userAuthStore } from "../store/authStore";

const Seemore = () => {
  const { id } = useParams();

  const { CategoryGetByProduct, Data } = useProductStore();
  const { user } = userAuthStore();
  const navigate = useNavigate();
  const [selectedSizes, setSelectedSizes] = useState({});

  const handleSizeClick = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  useEffect(() => {
    CategoryGetByProduct(id);
  }, [id]);

  console.log(Data);

  return (
    <div className="w-full h-full">
      <Header />
      <div className="lg:mt-30 mt-40 lg:px-10 px-3">
        <Breadcrums title="category" name="products" />
      </div>

      <div className="w-full h-full lg:h-auto lg:mt-5 my-10 lg:px-10 px-2">
        <div className="lg:px-6 grid xl:grid-cols-7 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
          {Data?.length > 0 ? (
            Data?.map((item) => (
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
                  <h1>₹ {item.discount}</h1>
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
            <div className="col-span-full text-center text-gray-600 text-lg font-semibold mt-5">
              This category is not available!
            </div>
          )}

          <div></div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Seemore;
