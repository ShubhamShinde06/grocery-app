import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Breadcrums from "../components/Breadcrums";
import Serach from "../components/Serach";
import ProductAdd from "../components/Product/ProductAdd";
import TabelProduct from "../components/Product/TabelProduct";

const Product = () => {
  const [open, setOpen] = useState(true);

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
                <Serach open={open} setOpen={setOpen} />
                <div>
                  <TabelProduct />
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
