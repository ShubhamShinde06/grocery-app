import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
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
  const { user } = useAuthStore();
  const { categoryGet, Data: categoryData } = useCategoryStore();
  const { subcategoryGet, Data: subcategoryData } = subcategoryStore();
  const { error, isLoading, productGet, productPut, productSingleGet, Data } =
    useProductStore();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [quantity, setQuantity] = useState([]);

  useEffect(() => {
    categoryGet();
    subcategoryGet();
    productSingleGet(id);
  }, [id]);

  useEffect(() => {
    if (Data && Data.length > 0) {
      const prod = Data[0];
      setName(prod.name || "");
      setDescription(prod.description || "");
      setUnit(prod.unit || "");
      setStock(prod.stock || "");
      setPrice(prod.price || "");
      setDiscount(prod.discount || "");
      setCategory([prod.category] || "");
      setSubCategory([prod.subCategory] || "");
      setImage1(prod.image1 || null);
      setImage2(prod.image2 || null);
      setImage3(prod.image3 || null);
      setImage4(prod.image4 || null);
      setQuantity([prod.quantity] || "")

    }
  }, [Data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("shopkeeper", user._id);
      formData.append("category", category);
      formData.append("subCategory", subcategory);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("unit", unit);
      formData.append("stock", stock);
      formData.append("price", price);
      formData.append("discount", discount);
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      await productPut(formData);
      await productGet(user._id);
      toast.success("Product Updated");
      navigateTo("/product");
    } catch (error) {
      toast.error("Failed to update product");
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div>
          <Header />
        </div>
        <div className="w-full h-[calc(100vh-80px)] flex justify-between">
          <div>
            <Sidebar />
          </div>
          <div className="w-full h-full flex flex-col gap-6 items-center mt-2 rounded-xl shadow overflow-scroll scroll-display lg:px-5 py-2 px-2">
            <div className="lg:w-1/2 w-full flex flex-col gap-6">
              <div className="flex justify-start">
                <button
                  onClick={() => navigateTo(-1)}
                  className="hover:bg-[#F5F7F9] cursor-pointer rounded-md text-xl hover:text-black underline text-black hover:scale-105 duration-300"
                >
                  Back
                </button>
              </div>
              <div className="w-full flex justify-start">
                <h1 className="lg:text-4xl text-2xl font-semibold">
                  Product information... Update
                </h1>
              </div>
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
                {/* Image Upload Section */}
                <div className="w-full flex flex-col gap-3">
                  <h1>Image</h1>
                  <div className="flex gap-2">
                    {[image1, image2, image3, image4].map((image, index) => (
                      <label htmlFor={`image${index + 1}`} key={index}>
                        <img
                          className="w-20 cursor-pointer"
                          src={image ? URL.createObjectURL(image) : "/upload_area.png"}
                          alt="upload"
                        />
                        <input
                          type="file"
                          id={`image${index + 1}`}
                          hidden
                          onChange={(e) => {
                            const setImage = [setImage1, setImage2, setImage3, setImage4][index];
                            setImage(e.target.files[0]);
                          }}
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {/* Category and Subcategory Dropdowns */}
                {/* <div className="w-full flex lg:flex-row flex-col items-center justify-between gap-5">
                  <div className="w-full py-4 flex gap-[40px]">
                    <select
                      name="category"
                      className="w-full py-2 bg-transparent border-b-2 outline-none"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option className="bg-white" value="">
                        Select Category
                      </option>
                       {category.map((cat) => (
                        <option key={cat._id} className="bg-white" value={cat._id}>
                          {category}
                        </option>
                      ))} 
                    </select>
                  </div>
                  <div className="w-full py-4 flex gap-[40px]">
                    <select
                      name="subcategory"
                      className="w-full py-2 bg-transparent border-b-2 outline-none"
                      value={subcategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                    >
                      <option className="bg-white" value="">
                        Select SubCategory
                      </option>
                      {subcategoryData.map((subcat) => (
                        <option key={subcat._id} className="bg-white" value={subcat._id}>
                          {subcat.name}
                        </option>
                      ))} 
                    </select>
                  </div>
                </div> */}

                {/* Name and Description Inputs */}
                <div className="w-full flex flex-col gap-3">
                  <label htmlFor="">Name</label>
                  <input
                    className="px-2 py-3 rounded-md bg-[#F5F7F9]"
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
                    className="px-2 py-3 rounded-md bg-[#F5F7F9]"
                    name="description"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                {/* Quantity and Unit Selection */}
                <div className="w-full flex lg:flex-row flex-col items-center justify-center gap-5">
                  <div>
                    <p className="mb-2">Product Quantity</p>
                    <div className="flex gap-3">
                      {["1", "5", "10"].map((qty) => (
                        <div
                          key={qty}
                          onClick={() =>
                            setQuantity((prev) =>
                              prev.includes(qty)
                                ? prev.filter((item) => item !== qty)
                                : [...prev, qty]
                            )
                          }
                        >
                          <p
                            className={`${
                              quantity.includes(qty) ? "bg-orange-300" : "bg-slate-200"
                            } px-3 py-1 cursor-pointer`}
                          >
                            {qty}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-3">
                    <label htmlFor="">Unit</label>
                    <select
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-full px-3 py-2"
                    >
                      <option value="Kg">Kg</option>
                      <option value="ml">ml</option>
                      <option value="Liter">Liter</option>
                    </select>
                  </div>
                </div>

                {/* Price and Discount Inputs */}
                <div className="w-full flex flex-col gap-3">
                  <label htmlFor="">Price</label>
                  <input
                    className="px-2 py-3 rounded-md bg-[#F5F7F9]"
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
                    className="px-2 py-3 rounded-md bg-[#F5F7F9]"
                    type="number"
                    name="discount"
                    placeholder="Discount"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>

                {/* Stock Checkbox */}
                <div className="w-full flex flex-col gap-3 lg:mt-6">
                  <div className="flex gap-2 mt-0">
                    <input
                      type="checkbox"
                      id="bestseller"
                      onChange={() => setStock((prev) => !prev)}
                      checked={stock}
                    />
                    <label className="cursor-pointer" htmlFor="bestseller">
                      In Stock
                    </label>
                  </div>
                </div>

                {/* Error Display */}
                {error && (
                  <p className="text-red-500 font-semibold mt-2">{error}</p>
                )}

                {/* Submit Button */}
                <div className="flex items-center justify-between gap-8">
                  <button
                    className="bg-[#FF8035] w-1/3 cursor-pointer lg:rounded-full rounded-md text-xl text-white py-2 lg:py-4 hover:scale-105 duration-300 flex items-center justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? <Loading /> : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductUpdate;