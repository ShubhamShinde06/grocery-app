import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Breadcrums from "../components/Breadcrums";
import { useProductStore } from "../store/productStore";
import OwnerHeader from "../components/OwnerHeader";
import { userAuthStore } from "../store/authStore";
import Card from "../components/Card";

const ShopOwnerProducts = () => {
  const { shopkeeperId } = useParams();

  const { user } = userAuthStore();
  const navigate = useNavigate();
  const [size, setSize] = useState("");
  const [btn, setBtn] = useState("Atta, Rice & Dal");

  const { ShopProductsGet, Data: products } = useProductStore();
  const [Atta, setAtta] = useState([]);
  const [shopname, setShopName] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});

  useEffect(() => {
    ShopProductsGet(shopkeeperId);
  }, [shopkeeperId, ShopProductsGet]);

  useEffect(() => {
    if (products) {
      const AttaiIems = products.filter(
        (item) =>
          btn.length === 0 || item.category.some((c) => btn.includes(c.name))
      );
      const ShopName = products[0]?.shopkeeper?.shopName || "";
      setAtta(AttaiIems);
      setShopName(ShopName);
    }
  }, [products, btn]);

  console.log(Atta);

  const handleSizeClick = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  return (
    <div className="w-full h-full flex flex-col lg:gap-0 gap-10 py-10">
      {/* header */}
      <div>
        <Header />
      </div>
      <div className=" w-full flex lg:flex-row flex-col justify-between lg:px-10 lg:mt-20 mt-20 px-5 lg:mb-5 gap-5">
        <Breadcrums title={"category"} name={btn} />
        <h1 className="flex gap-2  uppercase text-[16px] font-[600] text-[#818181]">
          Shop Name :- <p className="text-black">{shopname}</p>
        </h1>
      </div>

      <main className="w-full px-5 flex flex-col gap-5">
        {/* OwnerHeader */}
        <div>
          <OwnerHeader setBtn={setBtn} />
        </div>
        {/* cards 1 */}
        <h1 className="text-[#171717] lg:text-[40px] text-[35px] font-[600] text-center">
          Products
        </h1>
        <div className="lg:px-6 grid xl:grid-cols-7 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
          {Atta.length > 0 ? (
            Atta.map((item) => (
              <Card
                key={item._id}
                id={item._id}
                name={item.name}
                discount={item.discount}
                price={item.price}
                unit={item.unit}
                image={item.image}
                quantity={item.quantity}
                shopId={item.shopkeeper._id}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600 text-lg font-semibold mt-5">
              This category is not available!
            </div>
          )}

          <div></div>
        </div>
      </main>
      {/* footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ShopOwnerProducts;
