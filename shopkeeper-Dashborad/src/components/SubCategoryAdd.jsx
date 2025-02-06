import React from "react";

const SubCategoryAdd = () => {

  return (
    <div className=" w-full h-full flex flex-col gap-6 justify-center items-center mt-2 rounded-xl shadow overflow-scroll scroll-display lg:px-5 py-2 px-2">
      <div className=" lg:w-1/2 w-full flex flex-col gap-6">
        <div className=" w-full flex justify-start">
          <h1 className="lg:text-4xl text-2xl font-semibold">
            Sub-Category Add
          </h1>
        </div>
        <form className="w-full flex flex-col gap-6">
          <div className="w-full flex flex-col gap-3">
            <h1>Image</h1>
            <div className=" flex gap-2">
              <label htmlFor="image1">
                <img
                  className="w-20 cursor-pointer"
                  src={"/upload_area.png"}
                  alt="upload"
                />
                <input
                  type="file"
                  id="image1"
                  hidden
                  //onChange={(e)=>setImage1(e.target.files[0])}
                />
              </label>
            </div>
          </div>

          <div className="w-full flex flex-col gap-3">
            <label htmlFor="">Name</label>
            <input
              class="px-2 py-3 rounded-md  bg-[#F5F7F9]"
              type="text"
              name="Category"
              placeholder="Category"
            />
          </div>
          <div className="flex items-center justify-between gap-8">
            <button class="hover:bg-[#F5F7F9] w-1/4 cursor-pointer rounded-md  text-xl hover:text-black underline  text-black py-4 hover:scale-105 duration-300">
              Back
            </button>

            <button class="bg-[#FF8035] w-1/3 cursor-pointer lg:rounded-full rounded-md  text-xl text-white py-2 lg:py-4 hover:scale-105 duration-300">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubCategoryAdd;
