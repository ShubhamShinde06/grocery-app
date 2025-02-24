import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Breadcrums from "../components/Breadcrums";
import Footer from "../components/Footer";
import { useProductStore } from "../store/productStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { userAuthStore } from "../store/authStore";
import Card from "../components/Card";

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
