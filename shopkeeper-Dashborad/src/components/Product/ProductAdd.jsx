import React, { useEffect, useState } from "react";
import { useProductStore } from "../../Store/productStore";
import { toast } from "react-toastify";
import Loading from "../Loading";
import { subcategoryStore } from "../../Store/subcategoryStore";
import { useCategoryStore } from "../../Store/categoryStore";
import { useAuthStore } from "../../Store/authStore";

const ProductAdd = ({ setOpen }) => {
  const { productAdd, error, isLoading, productGet } = useProductStore();
  const { categoryGet, Data: categoryData } = useCategoryStore();
  const { subcategoryGet, Data: subcategoryData } = subcategoryStore();

  const [id, setID] = useState("");
  const { user } = useAuthStore();

  useEffect(() => {
    if (user && user._id) {
      console.log("User ID found:", user._id); // Debugging log
      setID(user._id);
    }
  }, [user]);

  useEffect(() => {
    categoryGet(), 
    subcategoryGet();
  }, []);

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("kg");
  const [stock, setStock] = useState(true);
  const [price, setPrice] = useState("");
  const [discount, steDiscount] = useState("");
  const [quantity, setQuantity] = useState([]);

  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [subcategory, setSubCategory] = useState();
  const [subcategories, setSubCategories] = useState([]);

  if (price < 0) {
    setPrice("");
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("shopkeeper", id);
      formData.append("category", category);
      formData.append("subCategory", subcategory);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("unit", unit);
      formData.append("stock", stock);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("quantity", JSON.stringify(quantity));
      image1 & formData.append("image1", image1);
      image2 & formData.append("image2", image2);
      image3 & formData.append("image3", image3);
      image4 & formData.append("image4", image4);

      await productAdd(formData);
      await productGet(id);
      toast.success("Product Added");

      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-full h-full flex flex-col gap-6 items-center mt-2 rounded-xl shadow overflow-scroll scroll-display lg:px-5 py-2 px-2">
      <div className=" lg:w-1/2 w-full flex flex-col gap-6">
        <div className=" flex justify-start ">
          <button
            onClick={() => setOpen(true)}
            className="hover:bg-[#F5F7F9]  cursor-pointer rounded-md  text-xl hover:text-black underline  text-black hover:scale-105 duration-300"
          >
            Back
          </button>
        </div>
        <div className=" w-full flex justify-start">
          <h1 className="lg:text-4xl text-2xl font-semibold">
            Product information... Add
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div className="w-full flex flex-col gap-3">
            <h1>Image</h1>
            <div className=" flex gap-2">
              <label htmlFor="image1">
                <img
                  className="w-20 cursor-pointer"
                  src={
                    !image1 ? "/upload_area.png" : URL.createObjectURL(image1)
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
                    !image2 ? "/upload_area.png" : URL.createObjectURL(image2)
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
                    !image3 ? "/upload_area.png" : URL.createObjectURL(image3)
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
                    !image4 ? "/upload_area.png" : URL.createObjectURL(image4)
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

          <div className=" w-full flex lg:flex-row flex-col items-center justify-between gap-5">
            {/* Category Selection Dropdown */}
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
                {categories.map((cat) => (
                  <option key={cat._id} className="bg-white" value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            {/* SubCategory Selection Dropdown */}
            <div className="w-full py-4 flex gap-[40px]">
              <select
                name="category"
                className="w-full py-2 bg-transparent border-b-2 outline-none"
                value={subcategory}
                onChange={(e) => setSubCategory(e.target.value)}
              >
                <option className="bg-white" value="">
                  Select SubCategory
                </option>
                {subcategories.map((cat) => (
                  <option key={cat._id} className="bg-white" value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full flex flex-col gap-3">
            <label htmlFor="">Name</label>
            <input
              className="px-2 py-3 rounded-md  bg-[#F5F7F9]"
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

          <div className=" w-full flex lg:flex-row flex-col items-center justify-center gap-5">
            <div>
              <p className="mb-2">Product Quantity</p>
              <div className=" flex gap-3">
                <div
                  onClick={() =>
                    setQuantity((prev) =>
                      prev.includes("1")
                        ? prev.filter((item) => item !== "1")
                        : [...prev, "1"]
                    )
                  }
                >
                  <p
                    className={`${
                      quantity.includes("1") ? "bg-orange-300" : "bg-slate-200"
                    } px-3 py-1 cursor-pointer`}
                  >
                    1
                  </p>
                </div>

                <div
                  onClick={() =>
                    setQuantity((prev) =>
                      prev.includes("5")
                        ? prev.filter((item) => item !== "5")
                        : [...prev, "5"]
                    )
                  }
                >
                  <p
                    className={`${
                      quantity.includes("5") ? "bg-orange-300" : "bg-slate-200"
                    } px-3 py-1 cursor-pointer`}
                  >
                    5
                  </p>
                </div>

                <div
                  onClick={() =>
                    setQuantity((prev) =>
                      prev.includes("10")
                        ? prev.filter((item) => item !== "10")
                        : [...prev, "10"]
                    )
                  }
                >
                  <p
                    className={`${
                      quantity.includes("10") ? "bg-orange-300" : "bg-slate-200"
                    } px-3 py-1 cursor-pointer`}
                  >
                    10
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-3">
              <label htmlFor="">Unit</label>
              <select
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2"
              >
                <option value="Kg">Kg</option>
                <option value="PCS">Pcs</option>
                <option value="Liter">Liter</option>
              </select>
            </div>
          </div>

          <div className="w-full flex flex-col gap-3">
            <label htmlFor="">Price</label>
            <input
              className="px-2 py-3 rounded-md  bg-[#F5F7F9]"
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
              className="px-2 py-3 rounded-md  bg-[#F5F7F9]"
              type="number"
              name="discount"
              placeholder="Discount"
              value={discount}
              onChange={(e) => steDiscount(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col gap-3 lg:mt-6">
            <div className=" flex gap-2 mt-0">
              <input
                type="checkbox"
                id="bestseller"
                onChange={() => setStock((prev) => !prev)}
                checked={stock}
              />
              <label className=" cursor-pointer" htmlFor="bestseller">
                In Stock
              </label>
            </div>
          </div>

          {error && <p className=" text-red-500 font-semibold mt-2">{error}</p>}
          <div className="flex items-center justify-between gap-8">
            <button className="bg-[#FF8035] w-1/3 cursor-pointer lg:rounded-full rounded-md  text-xl text-white py-2 lg:py-4 hover:scale-105 duration-300 flex items-center justify-center">
              {isLoading ? <Loading /> : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductAdd;
