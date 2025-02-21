import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Breadcrums from "../components/Breadcrums";
import { useProductStore } from "../store/productStore";
import Cards from "../components/Cards";
import OwnerHeader from "../components/OwnerHeader";
import { userAuthStore } from "../store/authStore";
import { CatAndSubStore } from "../store/CatAndSubStore";

const ShopOwnerProducts = () => {
  const { shopkeeperId } = useParams();

  const { user } = userAuthStore();
  const navigate = useNavigate();
  const [size, setSize] = useState("");
  const [btn, setBtn] = useState("Atta, Rice & Dal"
);

  const { ShopProductsGet, Data: products } = useProductStore();
  const [Atta, setAtta] = useState([]);
  const [shopname, setShopName] = useState([]);

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

  return (
    <div className="w-full h-full flex flex-col lg:gap-0 gap-20 py-10">
      {/* header */}
      <div>
        <Header />
      </div>
      <div className=" w-full flex lg:flex-row flex-col justify-between">
        <Breadcrums title={"category"} name={btn} />
        <h1 className="lg:mt-[70px] mb-5 mt-10 flex gap-2 px-5 uppercase text-[16px] font-[600] text-[#818181]">Shop Name :- <p className="text-black">{shopname}</p></h1>
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
                <h1 className=" text-[#959595] font-normal">
                  {item.quantity?.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSize(item)}
                      className={`mr-1 py-0 px-2 bg-gray-50 ${
                        item === size ? " border-orange-500 border" : ""
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                  {item.unit}
                </h1>
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
      </main>
      {/* footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ShopOwnerProducts;
