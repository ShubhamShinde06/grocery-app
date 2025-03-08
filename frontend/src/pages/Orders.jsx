import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { orderStore } from "../store/orderStore";
import { userAuthStore } from "../store/authStore";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../App";

const Orders = () => {
  const { user } = userAuthStore();
  const userId = user?._id;
  const [Data, setData] = useState([])


    const fecthOrders = async  () => {
  
        try {
      const response = await axios.get(`${server}/api/order/userorders/${userId}`,);
      if (response.data.success) {
    
        setData(response.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
      
    }
    useEffect(() => {
           if (userId) {
            fecthOrders()
    }
  }, [userId]);



  return (
    <div className="w-full h-full">
      <Header />
      <div className="w-full h-[calc(100vh-auto)] lg:mt-10 mt-20 lg:px-10 px-2">
        <div className="pt-16">
          <h2 className="text-2xl font-bold mb-5">My Orders</h2>

          <div>
            {Data?.map((order) =>
              order?.items?.map((product, idx) => (
                <div
                  key={`${order._id}-${idx}`}
                  className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="flex items-center gap-6 text-sm">
                    <img
                      src={product?.image?.[0] || "/placeholder.jpg"}
                      className="w-16 sm:w-20"
                      alt={product?.name || "Product Image"}
                    />

                    <div>
                      <p className="sm:text-base font-medium doted-text">{product?.name}</p>

                      <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                        <p>₹{order?.amount}</p>
                        <p>Quantity: {order?.quantity}</p>
                        <p>Size: {order?.size}</p>
                      </div>

                      <p className="mt-2">
                        Date:{" "}
                        <span className="text-gray-400">
                          {order?.date ? new Date(order.date).toDateString() : "N/A"}
                        </span>
                      </p>
                      <p className="mt-2">
                        Payment: <span className="text-gray-400">{order?.paymentMethod}</span>
                      </p>
                    </div>
                  </div>

                  <div className="md:w-1/2 flex justify-between">
                    <div className="flex items-center gap-2">
                      <p className="w-2 h-2 rounded-full bg-green-500"></p>
                      <p className="text-sm sm:text-base">{order?.status}</p>
                    </div>
                    <button onClick={fecthOrders} className="border px-4 py-2 text-sm font-medium rounded-sm">
                      Track Order
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
