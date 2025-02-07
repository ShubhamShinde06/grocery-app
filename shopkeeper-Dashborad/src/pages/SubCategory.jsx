import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Breadcrums from "../components/Breadcrums";
import Serach from "../components/Serach";
import SubCategoryAdd from "../components/Sub-category/SubCategoryAdd";
import TableSubCategory from "../components/Sub-category/TableSubCategory";

const SubCategory = () => {

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
          <Breadcrums name={"Sub-Category"} />
          {open ? (
            <>
              <div className=" w-full h-full mt-2 rounded-xl shadow overflow-scroll scroll-display lg:px-5 py-2 px-0">
                <Serach open={open} setOpen={setOpen} />
                <div>
                  <TableSubCategory/>
                </div>
              </div>
            </>
          ) : (
            <>
              <SubCategoryAdd setOpen={setOpen}/>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubCategory;
