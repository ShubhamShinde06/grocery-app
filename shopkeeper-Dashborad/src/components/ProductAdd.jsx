import React from "react";

const ProductAdd = () => {
  return (
    <div className=" w-full h-full flex flex-col gap-6 items-center mt-2 rounded-xl shadow overflow-scroll scroll-display lg:px-5 py-2 px-2">
      <div className=" lg:w-1/2 w-full flex flex-col gap-6">
        <div className=" w-full flex justify-start">
          <h1 className="lg:text-4xl text-2xl font-semibold">
            Product information... Add
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

          <div className="w-full py-4 flex gap-[40px]">
            <select
              name="category"
              className="w-full py-2 bg-transparent border-b-2 outline-none"
              // value={department}
              // onChange={(e) => setDepartment(e.target.value)}
            >
              <option className="bg-white" value={""}>
                Select Category
              </option>
              {/* {
                        departmentinfo.map((data) => ( */}
              <option className="bg-white" value={""}>
                {"Rice"}
              </option>
              {/* ))
                      } */}
            </select>
          </div>

          <div className="w-full py-4 flex gap-[40px]">
            <select
              name="sub category"
              className="w-full py-2 bg-transparent border-b-2 outline-none"
              // value={department}
              // onChange={(e) => setDepartment(e.target.value)}
            >
              <option className="bg-white" value={""}>
                Select Sub Category
              </option>
              {/* {
                        departmentinfo.map((data) => ( */}
              <option className="bg-white" value={""}>
                {"Rice"}
              </option>
              {/* ))
                      } */}
            </select>
          </div>

          <div className="w-full flex flex-col gap-3">
            <label htmlFor="">Name</label>
            <input
              class="px-2 py-3 rounded-md  bg-[#F5F7F9]"
              type="text"
              name="name"
              placeholder="Name"
            />
          </div>

          <div className="w-full flex flex-col gap-3">
            <label htmlFor="">Description</label>
            <textarea
              className="px-2 py-3 rounded-md  bg-[#F5F7F9]"
              name="description"
              placeholder="Description"
            ></textarea>
          </div>

          <div className="w-full flex flex-col gap-3">
            <label htmlFor="">Unit</label>
            <input
              class="px-2 py-3 rounded-md  bg-[#F5F7F9]"
              type="text"
              name="unit"
              placeholder="Unit"
            />
          </div>

          <div className="w-full flex flex-col gap-3">
            <label htmlFor="">Price</label>
            <input
              class="px-2 py-3 rounded-md  bg-[#F5F7F9]"
              type="number"
              name="price"
              placeholder="Price"
            />
          </div>

          <div className="w-full flex flex-col gap-3">
            <label htmlFor="">Discount</label>
            <input
              class="px-2 py-3 rounded-md  bg-[#F5F7F9]"
              type="number"
              name="discount"
              placeholder="Discount"
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

export default ProductAdd;
