import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useParams, useNavigate } from "react-router-dom";
import { CatAndSubStore } from "../store/CatAndSubStore";
import { useProductStore } from "../store/productStore";
import { userAuthStore } from "../store/authStore";
import Breadcrums from "../components/Breadcrums";

const Filtered = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const { CategoryByGetSubcategory, Data: SubCateData } = CatAndSubStore();
  const { ProductsGetByCateAndSubcat, Data: productData } = useProductStore();
  const { user } = userAuthStore();

  const [subCategoryId, setSubCategoryId] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});
  
    const handleSizeClick = (productId, size) => {
      setSelectedSizes((prev) => ({
        ...prev,
        [productId]: size,
      }));
    };

  useEffect(() => {
    CategoryByGetSubcategory(categoryId);
  }, [categoryId]);

  useEffect(() => {
    if (SubCateData?.length > 0) {
      setSubCategoryId(SubCateData[0]._id);
    }
  }, [SubCateData]);

  useEffect(() => {
    if (subCategoryId) {
      ProductsGetByCateAndSubcat(categoryId, subCategoryId);
    }
  }, [categoryId, subCategoryId]);

  return (
    <div className="w-full h-full">
      <Header />
      <div className="lg:mt-30 mt-40 lg:px-10 px-3">
        <Breadcrums title="filtered" name="products" />
      </div>

      <div className="w-full h-full lg:h-[calc(100vh-15vh)] lg:mt-5 my-10 lg:px-10 px-2 flex gap-2">
        {/* Sidebar for Subcategories */}
        <div className="lg:w-1/4 w-1/3 h-full overflow-y-scroll show-scroll shadow-xl">
          <div className="w-full h-full flex flex-col gap-5 lg:px-5 px-1 py-5">
            {SubCateData?.map((item) => (
              <div
                key={item._id}
                onClick={() => setSubCategoryId(item._id)}
                className={`py-3 w-full rounded-md text-xl cursor-pointer transition-all ${
                  subCategoryId === item._id
                    ? "backdrop-blur-sm lg:bg-[#F87E2D] lg:text-white lg:border-none text-black font-semibold px-2 border border-black"
                    : "text-black"
                }`}
              >
                <div className="w-full flex lg:flex-row flex-col lg:gap-3 lg:h-20 h-25 items-center">
                  <div className="w-15 h-20 flex lg:mt-7">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="text-xs lg:text-xl">{item.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full h-full">
          <div className="lg:px-6 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 place-content-center gap-4">
            {productData?.length > 0 ? (
              productData.map((item) => (
                <div
                  key={item._id}
                  className="w-[200px] h-70 mt-5 shadow-xl border-[1.5px] border-[#E8E8E8] rounded-xl px-4 flex flex-col justify-around gap-2"
                >
                  {/* Product Image */}
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

                  {/* Product Title */}
                  <main className="doted-text">{item.name}</main>

                  {/* Product Quantity */}
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

                  {/* Price & Add to Cart */}
                  <div className="w-full flex items-center justify-between py-2">
                    <h1>₹ {item.discount}</h1>
                    {!user ? (
                      <button
                        onClick={() => navigate("/auth")}
                        className="px-4 py-1 rounded-md cursor-pointer text-sm border text-[#FFFFFF] font-semibold bg-[#f87e2ddd] hover:shadow"
                      >
                        ADD
                      </button>
                    ) : (
                      <button className="px-4 py-1 rounded-md cursor-pointer text-sm border text-[#FFFFFF] font-semibold bg-[#f87e2ddd] hover:shadow">
                        ADD
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-600 text-lg font-semibold mt-5">
                This sub-category products is not available!
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Filtered;
