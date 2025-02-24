import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import Breadcrums from "./Breadcrums";
import RelatedItem from "./RelatedItem";
import { ShopContext } from "../Context/ShopContext";
import { userAuthStore } from "../store/authStore";

const IteamDeteils = () => {
  const { user } = userAuthStore();
  const userId = user?._id
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState(null);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    const product = products?.find((item) => item._id === id);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
      setFinalPrice(product.discount); // Default price
    }
  }, [id, products]);

  const handleSizeSelection = (selectedSize) => {
    setSize(selectedSize);
    setFinalPrice(productData.discount * selectedSize); // Corrected calculation
  };

  if (!productData) return <div>Loading...</div>;

  return (
    <div className="w-full flex flex-col lg:gap-0 gap-5 py-10">
      <Header />
      <div className="lg:mt-20 mt-30 lg:px-10 px-3">
        <Breadcrums title={"Product"} name={productData.name} />
      </div>

      <div className="w-full lg:px-12 px-5 lg:mt-10 mt-0 flex gap-10 lg:flex-row flex-col">
        <div className="flex gap-10 lg:flex-row flex-col-reverse">
          <div className="flex lg:flex-col flex-row gap-2 overflow-x-auto">
            {productData.image.map((img, index) => (
              <img
                key={index}
                src={img}
                className="shadow-xl lg:min-w-40 lg:mr-3 lg:h-42 w-32 h-38 cursor-pointer"
                onClick={() => setImage(img)}
                alt="product"
              />
            ))}
          </div>
          <div className="w-full">
            <img className="lg:min-w-[500px] lg:h-[700px] w-full h-[400px] shadow" src={image} alt="product" />
          </div>
        </div>
        
        <div className="right lg:mx-[40px] flex flex-col">
          <h1 className="text-[#3d3d3d] lg:text-[40px] text-[20px] font-bold">{productData.name}</h1>
          <h1 className="text-[#3d3d3d] lg:text-[20px] text-[20px] font-bold flex gap-2">
            Shop name:
            <Link to={`/shop/${productData?.shopkeeper?._id}`} className="cursor-pointer text-[#818181]">
              {productData?.shopkeeper?.shopName}
            </Link>
          </h1>
          <div className="prices flex my-[30px] gap-[30px] text-[24px] font-bold">
            <div className="text-[#818181] line-through">₹ {size === null ? productData.price : productData.price * (size * 1)}</div>
            <div className="text-[#f87e2d]">₹{finalPrice}</div>
          </div>
          <p className="font-normal lg:text-xl text-sm">{productData.description}</p>
          
          <h1 className="mt-[55px] text-[#656565] text-[20px] font-semibold">Select Quantity</h1>
          <div className="flex gap-2 my-[20px]">
            {productData.quantity?.map((qty, index) => (
              <button
                key={index}
                onClick={() => handleSizeSelection(qty)}
                className={`border py-2 px-4 bg-gray-100 ${qty === size ? "border-orange-500" : ""}`}
              >
                {qty} {productData.unit}
              </button>
            ))}
          </div>
          
          <button
            onClick={user ? () => addToCart(userId, productData._id, size, finalPrice, productData?.shopkeeper?._id) : () => navigate("/auth")}
            className="py-[20px] px-[40px] text-[16px] font-bold border text-white bg-[#f87e2d] mb-[40px] cursor-pointer rounded-md"
          >
            ADD TO CART
          </button>

          <p className="right-cat mt-[10px]"><span className="font-bold">Category: </span>{productData.category?.map((cat) => cat.name).join(", ")}</p>
          <p className="right-cat mt-[10px]"><span className="font-bold">Tags: </span>{productData.subCategory?.map((tag) => tag.name).join(", ")}</p>
        </div>
      </div>

      <RelatedItem category={productData.category?.[0]?.name} subCategory={productData.subCategory?.[0]?.name} />
    </div>
  );
};

export default IteamDeteils;