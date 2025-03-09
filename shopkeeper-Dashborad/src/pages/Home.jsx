import React, { useContext, useEffect, useState, useCallback } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Breadcrums from "../components/Breadcrums";
import { MdProductionQuantityLimits } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "../Store/authStore";
import { TbTruckDelivery } from "react-icons/tb";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { ShopContext } from "../Context/ShopContext";

const Home = () => {
  const { user } = useAuthStore();
  const { orders } = useContext(ShopContext);

  const [productTotal, setProductTotal] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const [amount, setAmount] = useState(0);
  const [profit, setProfit] = useState(0);

  const fetchDashboardData = useCallback(async () => {
    if (!user?._id) return; // Ensure user is loaded before fetching data

    try {
      const [productRes, orderRes] = await Promise.all([
        axios.get(`/api/product/get-owner-product/${user._id}`),
        axios.get(`/api/order/shoporders/${user._id}`)
      ]);

      if (productRes.data.success) {
        setProductTotal(productRes.data.total);
      } else {
        toast.error(productRes.data.message);
      }

      if (orderRes.data.success) {
        setOrderTotal(orderRes.data.total);
        const totalAmount = orderRes.data.data.reduce((acc, item) => acc + item.amount, 0);
        const calculatedProfit = (totalAmount * 25) / 100;

        setAmount(totalAmount);
        setProfit(calculatedProfit);
      } else {
        toast.error(orderRes.data.message);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to fetch dashboard data");
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user, fetchDashboardData]); // Run only when user is available

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <Header />
      <div className="w-full h-[calc(100vh-80px)] flex justify-between">
        <Sidebar />
        <div className="w-full h-full px-5 py-12">
          <Breadcrums name="Dashboard" />
          <div className="w-full h-full mt-2 rounded-xl shadow overflow-x-auto lg:px-5 py-2 px-0">
            <div className="flex lg:flex-row flex-col lg:items-center justify-between gap-3 lg:px-0 px-2">
              {[
                { label: "Total Items", value: productTotal, icon: <MdProductionQuantityLimits /> },
                { label: "Total Orders", value: orderTotal, icon: <TbTruckDelivery /> },
                { label: "Total Orders Amounts", value: `₹ ${amount}.00`, icon: <GiPayMoney /> },
                { label: "Total Net Profit", value: `₹ ${profit}.00`, icon: <GiReceiveMoney /> }
              ].map(({ label, value, icon }, index) => (
                <div key={index} className="lg:w-full w-[310px] h-35 rounded-md flex justify-between items-center px-5 gap-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold">
                  <div className="flex flex-col justify-center">
                    <h1 className="text-3xl">{value}</h1>
                    <h2 className="text-xl">{label}</h2>
                  </div>
                  <span className="text-5xl">{icon}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 overflow-x-auto px-2 lg:px-0">
              <h1 className="text-2xl">List of orders</h1>
              <table className="w-full border border-gray-300 rounded-xl mt-3">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold uppercase">
                    <th className="py-4 px-6 text-left">ID</th>
                    <th className="py-4 px-6 text-left">UserId</th>
                    <th className="py-4 px-6 text-left">Payment Method</th>
                    <th className="py-4 px-6 text-left">Amount</th>
                    <th className="py-4 px-6 text-left">Status</th>
                    <th className="py-4 px-6 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order, index) => (
                      <tr key={order._id} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition-all duration-300`}>
                        <td className="py-4 px-6 font-medium text-gray-800">{index + 1}</td>
                        <td className="py-4 px-6 font-semibold text-gray-900">{order.userId}</td>
                        <td className="py-4 px-6 font-semibold text-gray-900">{order.paymentMethod}</td>
                        <td className="py-4 px-6 font-semibold text-gray-900">₹ {order.amount}</td>
                        <td className="py-4 px-6 font-semibold text-gray-900">{order.status}</td>
                        <td className="py-4 px-6 font-semibold text-gray-900">{new Date(order.date).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-gray-600">No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
