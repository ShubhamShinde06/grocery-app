import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Breadcrums from "../components/Breadcrums";
import Serach from "../components/Serach";
import ProductAdd from "../components/Product/ProductAdd";
import TabelProduct from "../components/Product/TabelProduct";
import { useEffect } from "react";
import { useProductStore } from "../Store/productStore";

const Product = () => {
  const [open, setOpen] = useState(true);

  const {
    productDelete,
    productGet,
    Data: productData,
    total,
  } = useProductStore();

  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (!productData) return;
    setFilteredData(
      productData.filter(
        (item) =>
          item.name &&
          typeof item.name === "string" &&
          item.name.toLowerCase().includes(inputValue.toLowerCase()),
      ),
    );
  }, [inputValue, productData]);

  return (
    <div className=" w-full h-full flex flex-col ">
      <div>
        <Header />
      </div>
      <div className=" w-full h-[calc(100vh-80px)] flex justify-between">
        <div>
          <Sidebar />
        </div>
        <div className=" w-full h-full px-5 py-12 ">
          <Breadcrums name={"Product"} />
          {open ? (
            <>
              <div className=" w-full h-full mt-2 rounded-xl shadow overflow-scroll scroll-display lg:px-5 py-2 px-0">
                <Serach
                  open={open}
                  setOpen={setOpen}
                  serach={inputValue}
                  setSearch={setInputValue}
                />
                <div>
                  <TabelProduct Data={filteredData} />
                </div>
              </div>
            </>
          ) : (
            <>
              <ProductAdd setOpen={setOpen} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
