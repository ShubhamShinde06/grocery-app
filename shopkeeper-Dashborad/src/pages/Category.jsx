import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Breadcrums from "../components/Breadcrums";
import Serach from "../components/Serach";
import CategoryAdd from "../components/Category/CategoryAdd";
import TabelCategory from "../components/Category/TabelCategory";
import { useCategoryStore } from "../Store/categoryStore";

const Category = () => {
  const [open, setOpen] = useState(true);

   const { Data } = useCategoryStore();

  const [inputValue, setInputValue] = useState("");
    const [filteredData, setFilteredData] = useState([]);
  
    useEffect(() => {
      if (!Data) return;
      setFilteredData(
        Data.filter(
          (item) =>
            item.name &&
            typeof item.name === "string" &&
            item.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }, [inputValue, Data]);

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
          <Breadcrums name={"Category"} />
          {open ? (
            <>
              <div className=" w-full h-full mt-2 rounded-xl shadow overflow-x-auto overflow-scroll scroll-display lg:px-5 py-2 px-0">
                <Serach open={open} setOpen={setOpen} serach={inputValue} setSearch={setInputValue}/>
                <div>
                  <TabelCategory setOpen={setOpen} data={filteredData} />
                </div>
              </div>
            </>
          ) : (
            <>
              <CategoryAdd open={open} setOpen={setOpen} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
