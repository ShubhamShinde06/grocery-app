import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Breadcrums from "../components/Breadcrums";
import { useAuthStore } from "../Store/authStore";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../Context/ShopContext";
import { TbTruckDelivery } from "react-icons/tb";

const Orders = () => {
  const { user } = useAuthStore();
  const shopId = user._id;
  console.log(shopId);

  const {orders, fetchAllOrders} = useContext(ShopContext);

  // const fetchAllOrders = async () => {
  //   try {
  //     const response = await axios.get(`/api/order/shoporders/${shopId}`);
  //     if (response.data.success) {
  //       console.log(response.data.data);
  //       setOrders(response.data.data);
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.message);
  //   }
  // };
  // useEffect(() => {
  //   fetchAllOrders();
  // }, [shopId]);

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post("/api/order/status", {
        orderId,
        status: e.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  console.log(orders);

  return (
    <div className=" w-full h-full flex flex-col overflow-hidden">
      <div>
        <Header />
      </div>
      <div className=" w-full h-[calc(100vh-80px)] flex justify-between">
        <div>
          <Sidebar />
        </div>
        <div className=" w-full h-full px-5 py-12 overflow-scroll scroll-display">
          <Breadcrums name={"Orders"} />
          <div >
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <div
                  className=" grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-8 text-xs sm:text-sm text-gray-700"
                  key={index}
                >
                  <div className="w-25 h-full mt-2 flex items-center justify-center text-8xl">
                    {/* <img
                      className="w-full h-full"
                      src={
                        "https://roadcast.in/static/img/mod/courier-parcel-banner.png"
                      }
                      alt=""
                    /> */}
                    <TbTruckDelivery />
                  </div>

                  <div>
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return (
                          <p className="py-0.5" key={index}>
                            {" "}
                            {item.name} X {order.quantity} {order.size}{" "}
                            {item.unit}
                            <span> {item.size}</span>
                          </p>
                        );
                      } else {
                        return (
                          <p className="py-0.5" key={index}>
                            {" "}
                            {item.name} X {order.quantity} {order.size}{" "}
                            {item.unit}
                            <span> {item.size}</span>
                          </p>
                        );
                      }
                    })}

                    <p className=" mt-3 mb-2 font-medium">
                      {order.address.firstName + " " + order.address.lastName}
                    </p>
                    <div>
                      <p>{order.address.street + ", "}</p>
                      <p>
                        {order.address.city +
                          ", " +
                          order.address.state +
                          ", " +
                          order.address.country +
                          ", " +
                          order.address.zipcode}
                      </p>
                    </div>
                    <div>
                      <p>{order.address.phone}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm sm:text-[15px]">
                      Items: {order.items.length}
                    </p>
                    <p className="mt-3">Method: {order.paymentMethod}</p>
                    <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                    <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <p className="text-sm sm:text-[15px]">
                    {"₹"}
                    {order.amount}
                  </p>
                  <select
                    onChange={(e) => statusHandler(e, order._id)}
                    value={order.status}
                    className=" p-2 font-semibold"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out fro delivery">Out fro delivery</option>
                    <option value="Deliverd">Deliverd</option>
                  </select>
                </div>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-4 text-gray-600  flex justify-between items-center"
                >
                  No Orders available
                </td>
              </tr>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
