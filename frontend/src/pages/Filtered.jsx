import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useParams, useNavigate } from "react-router-dom";
import { CatAndSubStore } from "../store/CatAndSubStore";
import { useProductStore } from "../store/productStore";
import { userAuthStore } from "../store/authStore";
import Breadcrums from "../components/Breadcrums";
import Card from "../components/Card";

const Filtered = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const { CategoryByGetSubcategory, Data: SubCateData } = CatAndSubStore();
  const { ProductsGetByCateAndSubcat, Data: productData } = useProductStore();
  const { user } = userAuthStore();

  const [subCategoryId, setSubCategoryId] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});

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

  const handleSizeClick = (productId, size, discount) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: { size, finalPrice: discount * size },
    }));
  };

  return (
    <div className="w-full h-full">
      <Header />
      <div className="lg:mt-30 mt-40 lg:px-10 px-3">
        <Breadcrums title="filtered" name="products" />
      </div>

      <div className="w-full h-full lg:h-[calc(100vh-15vh)] lg:mt-5 my-10 lg:px-10 px-2 flex gap-2">
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

        <div className="w-full h-full">
          <div className="lg:px-6 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 place-content-center gap-4">
            {productData?.length > 0 ? (
              productData.map((item) => (
                <Card
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  discount={item.discount}
                  price={item.price}
                  unit={item.unit}
                  image={item.image}
                  quantity={item.quantity}
                  shopId={item.shopkeeper}
                />
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
