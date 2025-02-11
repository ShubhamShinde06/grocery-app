import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Breadcrums from "../components/Breadcrums";
import { useProductStore } from "../Store/productStore";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { subcategoryStore } from "../Store/subcategoryStore";
import { useCategoryStore } from "../Store/categoryStore";
import { useAuthStore } from "../Store/authStore";
import { useNavigate, useParams } from "react-router-dom";

const ProductUpdate = () => {
  const { id } = useParams();

  const navigateTo = useNavigate();
  const [ids, setID] = useState("");

  const { error, isLoading, productGet, productPut, productSingleGet, Data } =
    useProductStore();
  const { categoryGet, Data: categoryData } = useCategoryStore();
  const { subcategoryGet, Data: subcategoryData } = subcategoryStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user && user._id) {
      console.log("User ID found:", user._id); // Debugging log
      setID(user._id);
    }
  }, [user]);

  useEffect(() => {
    categoryGet(), subcategoryGet(), productSingleGet(id);
  }, [id]);

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [discount, steDiscount] = useState("");

  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [subcategory, setSubCategory] = useState();
  const [subcategories, setSubCategories] = useState([]);

  useEffect(() => {
    // Make sure Data has been fetched
    if (Data && Data.length > 0) {
      setName(Data[0].name || ""); // Set the name from the first category
      setImage1(Data[0].image || false); // Set the image if available
    }
  }, [Data]); // Only run when `Data` changes

  // Set fetched subcategory details into state
  useEffect(() => {
    if (subcategoryData) {
      if (
        Array.isArray(subcategoryData.category) &&
        subcategoryData.category.length > 0
      ) {
        setSubCategory(subcategoryData.category[0]._id || ""); // Extract first category ID
      }
    }
  }, [subcategoryData]);

  useEffect(() => {
    if (Array.isArray(subcategoryData)) {
      setSubCategories(subcategoryData);
    }
  }, [subcategoryData]);
  //console.log("subData", subcategoryData);

  // Set fetched category details into state
  useEffect(() => {
    if (categoryData) {
      if (
        Array.isArray(categoryData.category) &&
        categoryData.category.length > 0
      ) {
        setCategory(categoryData.category[0]._id || ""); // Extract first category ID
      }
    }
  }, [categoryData]);
  useEffect(() => {
    if (Array.isArray(categoryData)) {
      setCategories(categoryData);
    }
  }, [categoryData]);
  //console.log("catData", categories);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("shopkeeper", ids);
      formData.append("category", category);
      formData.append("subCategory", subcategory);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("unit", unit);
      formData.append("stock", stock);
      formData.append("price", price);
      formData.append("discount", discount);
      image1 & formData.append("image1", image1);
      image2 & formData.append("image2", image2);
      image3 & formData.append("image3", image3);
      image4 & formData.append("image4", image4);

      await productPut(formData);
      await productGet(ids);
      toast.success("Product Added");
    } catch (error) {
      console.log(error);
    }
  };

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

          <div className=" w-full h-full mt-2 rounded-xl shadow overflow-scroll scroll-display lg:px-5 py-2 px-0">
            {/* update */}
            <div className=" w-full h-full flex flex-col gap-6 items-center mt-2 rounded-xl shadow overflow-scroll scroll-display lg:px-5 py-2 px-2">
              <div className=" lg:w-1/2 w-full flex flex-col gap-6">
                <div className=" w-full flex items-start">
                  <button
                    onClick={() => navigateTo("/product")}
                    class=" cursor-pointer rounded-md  text-xl hover:text-black underline  text-black py-4 hover:scale-105 duration-300"
                  >
                    Back
                  </button>
                </div>

                <div className=" w-full flex justify-start">
                  <h1 className="lg:text-4xl text-2xl font-semibold">
                    Product information... Update
                  </h1>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col gap-6"
                >
                  <div className="w-full flex flex-col gap-3">
                    <h1>Image</h1>
                    <div className=" flex gap-2">
                      <label htmlFor="image1">
                        <img
                          className="w-20 cursor-pointer"
                          src={
                            image1 instanceof File
                              ? URL.createObjectURL(image1)
                              : "/upload_area.png"
                          }
                          alt="upload"
                        />
                        <input
                          type="file"
                          id="image1"
                          hidden
                          onChange={(e) => setImage1(e.target.files[0])}
                        />
                      </label>
                      <label htmlFor="image2">
                      <img
  className="w-20 cursor-pointer"
  src={
    image2 instanceof File ? URL.createObjectURL(image2) : "/upload_area.png"
  }
  alt="upload"
/>

                        <input
                          type="file"
                          id="image2"
                          hidden
                          onChange={(e) => setImage2(e.target.files[0])}
                        />
                      </label>
                      <label htmlFor="image3">
                      <img
  className="w-20 cursor-pointer"
  src={
    image3 instanceof File ? URL.createObjectURL(image3) : "/upload_area.png"
  }
  alt="upload"
/>

                        <input
                          type="file"
                          id="image3"
                          hidden
                          onChange={(e) => setImage3(e.target.files[0])}
                        />
                      </label>
                      <label htmlFor="image4">
                      <img
  className="w-20 cursor-pointer"
  src={
    image4 instanceof File ? URL.createObjectURL(image4) : "/upload_area.png"
  }
  alt="upload"
/>

                        <input
                          type="file"
                          id="image4"
                          hidden
                          onChange={(e) => setImage4(e.target.files[0])}
                        />
                      </label>
                    </div>
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

                  {/* Category Selection Dropdown */}
                  <div className="w-full py-4 flex gap-[40px]">
                    <label>Select Category:</label>
                    <select
                      name="category"
                      className="w-full py-2 bg-transparent border-b-2 outline-none"
                      value={subcategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                    >
                      <option className="bg-white" value="">
                        Select Category
                      </option>
                      {subcategories.map((cat) => (
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

                  <div className="w-full flex flex-col gap-3">
                    <label htmlFor="">Name</label>
                    <input
                      class="px-2 py-3 rounded-md  bg-[#F5F7F9]"
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="w-full flex flex-col gap-3">
                    <label htmlFor="">Description</label>
                    <textarea
                      className="px-2 py-3 rounded-md  bg-[#F5F7F9]"
                      name="description"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="w-full flex flex-col gap-3">
                    <label htmlFor="">Unit</label>
                    <input
                      class="px-2 py-3 rounded-md  bg-[#F5F7F9]"
                      type="text"
                      name="unit"
                      placeholder="Unit"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                    />
                  </div>

                  <div className="w-full flex flex-col gap-3">
                    <label htmlFor="">Stock</label>
                    <input
                      class="px-2 py-3 rounded-md  bg-[#F5F7F9]"
                      type="number"
                      name="stock"
                      placeholder="stock"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>

                  <div className="w-full flex flex-col gap-3">
                    <label htmlFor="">Price</label>
                    <input
                      class="px-2 py-3 rounded-md  bg-[#F5F7F9]"
                      type="number"
                      name="price"
                      placeholder="Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="w-full flex flex-col gap-3">
                    <label htmlFor="">Discount</label>
                    <input
                      class="px-2 py-3 rounded-md  bg-[#F5F7F9]"
                      type="number"
                      name="discount"
                      placeholder="Discount"
                      value={discount}
                      onChange={(e) => steDiscount(e.target.value)}
                    />
                  </div>
                  {error && (
                    <p className=" text-red-500 font-semibold mt-2">{error}</p>
                  )}
                  <div className="flex items-center justify-center gap-8">
                    <button class="bg-[#FF8035] w-1/3 cursor-pointer lg:rounded-full rounded-md  text-xl text-white py-2 lg:py-4 hover:scale-105 duration-300 flex items-center justify-center">
                      {isLoading ? <Loading /> : "Update"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
