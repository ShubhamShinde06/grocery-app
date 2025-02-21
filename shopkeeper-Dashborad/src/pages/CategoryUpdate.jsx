import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Breadcrums from "../components/Breadcrums";
import { useCategoryStore } from "../Store/categoryStore";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { useAuthStore } from "../Store/authStore";

const CategoryUpdate = () => {
  const { id } = useParams();
  const navigateTo = useNavigate();

  const [image, setImage] = useState(false);
  const [name, setName] = useState("");

  const {
    categoryPut,
    error,
    isLoading,
    categorySingleGet,
    Data,
    categoryGet,
  } = useCategoryStore();

  const { user } = useAuthStore();


  useEffect(() => {
    categorySingleGet(id);
  }, [id]); // Fetch category when `id` changes

  useEffect(() => {
    // Make sure Data has been fetched
    if (Data && Data.length > 0) {
      setName(Data[0].name || ""); // Set the name from the first category
      setImage(Data[0].image || false); // Set the image if available
    }
  }, [Data]); // Only run when `Data` changes

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      //formData.append("shopkeeper", user._id);
      formData.append("name", name); // This appends the name field
      if (image) formData.append("image", image); // Appends image only if available

      await categoryPut(formData, id); // Pass the formData and id
      await categoryGet(ids);
      toast.success("Category Updated");
      setTimeout(() => {
        navigateTo("/category");
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
                  onClick={() => navigateTo("/category")}
                  class="hover:bg-[#F5F7F9]  cursor-pointer rounded-md  text-xl hover:text-black underline  text-black hover:scale-105 duration-300"
                >
                  Back
                </button>
              </div>
              <h1 className="lg:text-4xl text-2xl font-semibold">
                Category Update
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
                  <label htmlFor="">Name</label>
                  <input
                    className="px-2 py-3 rounded-md bg-[#F5F7F9]"
                    type="text"
                    name="name"
                    placeholder="Category"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {error && (
                  <p className="text-red-500 font-semibold mt-2">{error}</p>
                )}

                <div className="flex items-center justify-between gap-8">
                  <button className="bg-[#FF8035] w-1/3 cursor-pointer lg:rounded-full rounded-md text-xl text-white py-2 lg:py-4 hover:scale-105 duration-300 flex items-center justify-center">
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

export default CategoryUpdate;
