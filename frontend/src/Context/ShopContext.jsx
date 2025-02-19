import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../App";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${server}/api/product/get-product`);
      if (response.data.success) {
        setProducts(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  console.log(products)

  const value = {
    products,
    setProducts,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
