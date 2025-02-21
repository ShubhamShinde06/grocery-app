import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Breadcrums from "../components/Breadcrums";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { subcategoryStore } from "../Store/subcategoryStore";
import { useCategoryStore } from "../Store/categoryStore"; // Fetch all categories
import { useAuthStore } from "../Store/authStore";

const SubcategoryUpdate = () => {
  const { id } = useParams();
  const navigateTo = useNavigate();

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState(""); // Store selected category ID
  const [categories, setCategories] = useState([]); // Store all categories

  const {
    subcategoryPut,
    error,
    isLoading,
    subcategoryGet,
    subcategorySingleGet,
    Data: subcategoryData,
  } = subcategoryStore();

  const { categoryGet, Data: categoryData } = useCategoryStore(); // Fetch all categories

  // Fetch single subcategory details & all categories
  useEffect(() => {
    subcategorySingleGet(id);
    categoryGet(); // Fetch all categories
  }, [id]);

  // Set fetched subcategory details into state
  useEffect(() => {
    if (subcategoryData) {
      setName(subcategoryData.name || "");
      setImage(subcategoryData.image || null);

      if (
        Array.isArray(subcategoryData.category) &&
        subcategoryData.category.length > 0
      ) {
        setCategory(subcategoryData.category[0]._id || ""); // Extract first category ID
      }
    }
  }, [subcategoryData]);

  // Set all fetched categories into state
  useEffect(() => {
    if (Array.isArray(categoryData)) {
      setCategories(categoryData);
    }
  }, [categoryData]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("category", category);
      formData.append("name", name);
      //formData.append("shopkeeper", ids);
      if (image instanceof File) {
        formData.append("image", image);
      }

      await subcategoryPut(formData, id);
      await subcategoryGet(ids);
      toast.success("Sub-Category Updated");
      setTimeout(() => {
        navigateTo("/sub-category");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const imageURL =
    image && image instanceof File ? URL.createObjectURL(image) : image;

  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <div className="w-full h-[calc(100vh-80px)] flex justify-between">
        <Sidebar />
        <div className="w-full h-full px-5 py-12">
          <Breadcrums name={"Category"} />

          <div className="w-full h-full flex flex-col gap-6 justify-center items-center mt-2 rounded-xl shadow overflow-scroll scroll-display lg:px-5 py-2 px-2">
            <div className="lg:w-1/2 w-full flex flex-col gap-6">
              <div className=" flex justify-start ">
                <button
                  onClick={() => navigateTo("/sub-category")}
                  class="hover:bg-[#F5F7F9]  cursor-pointer rounded-md  text-xl hover:text-black underline  text-black hover:scale-105 duration-300"
                >
                  Back
                </button>
              </div>
              <h1 className="lg:text-4xl text-2xl font-semibold">
                Sub Category Update
              </h1>
              <form
                onSubmit={onSubmitHandler}
                className="w-full flex flex-col gap-6"
              >
                <div className="w-full flex flex-col gap-3">
                  <h1>Image</h1>
                  <div className="flex gap-2">
                    <label htmlFor="image">
                      <img
                        className="w-20 cursor-pointer"
                        src={imageURL || "/upload_area.png"}
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
                  <label htmlFor="name">Name</label>
                  <input
                    className="px-2 py-3 rounded-md bg-[#F5F7F9]"
                    type="text"
                    name="name"
                    placeholder="Category"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Category Selection Dropdown */}
                <div className="w-full py-4 flex gap-[40px]">
                  <label>Select Category:</label>
                  <select
                    name="category"
                    className="w-full py-2 bg-transparent border-b-2 outline-none"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option className="bg-white" value="">
                      Select Category
                    </option>
                    {categories.map((cat) => (
                      <option
                        key={cat._id}
                        className="bg-white"
                        value={cat._id}
                      >
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {error && (
                  <p className="text-red-500 font-semibold mt-2">{error}</p>
                )}

                <div className="flex items-center justify-between gap-8">
                  <button
                    type="submit"
                    className="bg-[#FF8035] w-1/3 cursor-pointer lg:rounded-full rounded-md text-xl text-white py-2 lg:py-4 hover:scale-105 duration-300 flex items-center justify-center"
                  >
                    {isLoading ? <Loading /> : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcategoryUpdate;
