import { createContext, useEffect, useState } from "react";
import { useAuthStore } from "../Store/authStore";
import axios from "axios";
import { toast } from "react-toastify";


export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const { user } = useAuthStore();
    //const shopId = user._id;

    const [shopId, setSopId] = useState('')

    useEffect(()=>{
      if(user){
        setSopId(user._id)
      }
    },[user])


  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`/api/order/shoporders/${shopId}`);
      if (response.data.success) {
        console.log(response.data.data);
        setOrders(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, [shopId]);

 

  const value = {
    orders, 
    setOrders,
    fetchAllOrders
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
