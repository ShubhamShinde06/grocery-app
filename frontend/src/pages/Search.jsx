import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ShopContext } from "../Context/ShopContext";
import Card from "../components/Card";

const Search = () => {
  const { products } = useContext(ShopContext);

  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (!products) return;
    setFilteredData(
      products.filter(
        (item) =>
          item.name &&
          typeof item.name === "string" &&
          item.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, products]);

  return (
    <div className="w-full h-full">
      <Header search={inputValue} setSearch={setInputValue} />
      <div className="w-full h-[calc(100vh-20vh)] lg:mt-25 mt-40 lg:px-10 px-2">
        <div className="grid xl:grid-cols-7 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
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
            <div className="col-span-full text-center text-gray-600 text-lg font-semibold mt-5 h-[70vh]">
              This Product is not available!
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
