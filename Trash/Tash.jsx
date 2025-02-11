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
  const { user } = useAuthStore();
  const { categoryGet, Data: categoryData } = useCategoryStore();
  const { subcategoryGet, Data: subcategoryData } = subcategoryStore();
  const { error, isLoading, productGet, productPut, productSingleGet, Data } =
    useProductStore();

  const [product, setProduct] = useState({});
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

  useEffect(() => {
    categoryGet();
    subcategoryGet();
    productSingleGet(id);
  }, [id]);

  useEffect(() => {
    if (Data && Data.length > 0) {
      const prod = Data[0];
      setProduct(prod);
      setName(prod.name || "");
      setDescription(prod.description || "");
      setUnit(prod.unit || "");
      setStock(prod.stock || "");
      setPrice(prod.price || "");
      setDiscount(prod.discount || "");
      // setCategory(prod.category || "");
      // setSubCategory(prod.subCategory || "");
      setImage1(prod.image1 || null);
      setImage2(prod.image2 || null);
      setImage3(prod.image3 || null);
      setImage4(prod.image4 || null);
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
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <div className="w-full h-[calc(100vh-80px)] flex">
        <Sidebar />
        <div className="w-full h-full px-5 py-12">
          <Breadcrums name="Product" />
          <div className="w-full mt-2 rounded-xl shadow p-5">
            <button
              onClick={() => navigateTo("/product")}
              className="underline text-black py-2"
            >
              Back
            </button>
            <h1 className="text-4xl font-semibold">Update Product</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="w-full flex flex-col gap-3">
                <h1>Image</h1>
                <div className=" flex gap-2">
                  <label htmlFor="image">
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
                      id="image"
                      name="image"
                      hidden
                      onChange={(e) => setImage1(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>
              <div className="w-full flex flex-col gap-3">
                <h1>Image</h1>
                <div className=" flex gap-2">
                  <label htmlFor="image">
                    <img
                      className="w-20 cursor-pointer"
                      src={
                        image3 instanceof File
                          ? URL.createObjectURL(image3)
                          : "/upload_area.png"
                      }
                      alt="upload"
                    />

                    <input
                      type="file"
                      id="image"
                      name="image"
                      hidden
                      onChange={(e) => setImage2(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>
              <div className="w-full flex flex-col gap-3">
                <h1>Image</h1>
                <div className=" flex gap-2">
                  <label htmlFor="image">
                    <img
                      className="w-20 cursor-pointer"
                      src={
                        image2 instanceof File
                          ? URL.createObjectURL(image2)
                          : "/upload_area.png"
                      }
                      alt="upload"
                    />

                    <input
                      type="file"
                      id="image"
                      name="image"
                      hidden
                      onChange={(e) => setImage3(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>
              <div className="w-full flex flex-col gap-3">
                <h1>Image</h1>
                <div className=" flex gap-2">
                  <label htmlFor="image">
                    <img
                      className="w-20 cursor-pointer"
                      src={
                        image4 instanceof File
                          ? URL.createObjectURL(image4)
                          : "/upload_area.png"
                      }
                      alt="upload"
                    />

                    <input
                      type="file"
                      id="image"
                      name="image"
                      hidden
                      onChange={(e) => setImage4(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-2 py-3 rounded-md bg-gray-200"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="px-2 py-3 rounded-md bg-gray-200"
              ></textarea>
              <input
                type="text"
                placeholder="Unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="px-2 py-3 rounded-md bg-gray-200"
              />
              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="px-2 py-3 rounded-md bg-gray-200"
              />
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="px-2 py-3 rounded-md bg-gray-200"
              />
              <input
                type="number"
                placeholder="Discount"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="px-2 py-3 rounded-md bg-gray-200"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-2 py-3 rounded-md bg-gray-200"
              >
                <option value="">Select Category</option>
                {categoryData.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <select
                value={subcategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="px-2 py-3 rounded-md bg-gray-200"
              >
                <option value="">Select Subcategory</option>
                {subcategoryData.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600"
              >
                {isLoading ? <Loading /> : "Update"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
