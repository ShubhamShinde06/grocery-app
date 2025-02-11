import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../Loading";
import { subcategoryStore } from "../../Store/subcategoryStore";
import { useCategoryStore } from "../../Store/categoryStore";
import { useAuthStore } from "../../Store/authStore";

const SubCategoryAdd = ({ setOpen }) => {
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState();

  const { categoryGet, Data } = useCategoryStore();
  const { subcategoryAdd, error, isLoading, subcategoryGet } =
    subcategoryStore();

  const onSumitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("category", category);
      formData.append("name", name);
      image & formData.append("image", image);

      await subcategoryAdd(formData);
      await subcategoryGet();
      toast.success("Sub-Category Added");
      setTimeout(() => {
        setOpen(true);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    categoryGet();
  }, [categoryGet]);

  return (
    <div className=" w-full h-full flex flex-col gap-6 justify-center items-center mt-2 rounded-xl shadow overflow-scroll scroll-display lg:px-5 py-2 px-2">
      <div className=" lg:w-1/2 w-full flex flex-col gap-6">
        <div className=" flex justify-start ">
          <button
            onClick={() => setOpen(true)}
            class="hover:bg-[#F5F7F9]  cursor-pointer rounded-md  text-xl hover:text-black underline  text-black hover:scale-105 duration-300"
          >
            Back
          </button>
        </div>

        <div className=" w-full flex justify-start">
          <h1 className="lg:text-4xl text-2xl font-semibold">
            Sub-Category Add
          </h1>
        </div>
        <form onSubmit={onSumitHandler} className="w-full flex flex-col gap-6">
          <div className="w-full flex flex-col gap-3">
            <h1>Image</h1>
            <div className=" flex gap-2">
              <label htmlFor="image">
                <img
                  className="w-20 cursor-pointer"
                  src={!image ? "/upload_area.png" : URL.createObjectURL(image)}
                  alt="upload"
                />
                <input
                  type="file"
                  id="image"
                  name="image"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            </div>
          </div>

          <div className="w-full flex flex-col gap-3">
            <label htmlFor="">Name</label>
            <input
              class="px-2 py-3 rounded-md  bg-[#F5F7F9]"
              type="text"
              name="name"
              placeholder="Category"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="w-full py-4 flex gap-[40px]">
            <select
              name="category"
              className="w-full py-2 bg-transparent border-b-2 outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option className="bg-white" value={""}>
                Select Category
              </option>
              {Data?.map((data) => (
                <option className="bg-white" value={data._id}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>
          {error && <p className=" text-red-500 font-semibold mt-2">{error}</p>}
          <div className="flex items-center justify-between gap-8">
            <button class="bg-[#FF8035] w-1/3 cursor-pointer lg:rounded-full rounded-md  text-xl text-white py-2 lg:py-4 hover:scale-105 duration-300 flex items-center justify-center">
              {isLoading ? <Loading /> : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubCategoryAdd;
