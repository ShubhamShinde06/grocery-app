import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Breadcrums from "../components/Breadcrums";
import { MdProductionQuantityLimits } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "../Store/authStore";
import { TbTruckDelivery } from "react-icons/tb";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import {ShopContext} from '../Context/ShopContext'

const Home = () => {
  const { user } = useAuthStore();

  const {orders} = useContext(ShopContext);


  const [id, setID] = useState("");
  const [shopId, setshopId] = useState("");

  const [productTotal, setProductTotal] = useState(null)
  const [orderTotal, setOrderTotal] = useState(null)
  const [amount, setAmount] = useState([])
  const [profilt, setProfilt] = useState(null)

  useEffect(() => {
    if (user && user._id) {
      setID(user._id);
      setshopId(user._id)
    }
  }, [user]);

  const getProductsTotal = async () => {
    try {
      const response = await axios.get(`/api/product/get-owner-product/${id}`);
      if (response.data.success) {
        //setProducts(response.data.total);
        setProductTotal(response.data.total);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const fetchAllOrdersTotal = async () => {
    try {
      const response = await axios.get(`/api/order/shoporders/${shopId}`);
      if (response.data.success) {
        setOrderTotal(response.data.total);
        const amount = (response.data.data.map((item) => item.amount))
        const totalAmount = amount.reduce((acc, curr) => acc + curr, 0);
        const profit = totalAmount * 0.25;  // 25% profit
        //const finalAmount = totalAmount + profit;
        setAmount(totalAmount)
        setProfilt(profit)
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsTotal();
    fetchAllOrdersTotal();
  }, [id]);

  return (
    <div className=" w-full h-full flex flex-col overflow-hidden">
      <div>
        <Header />
      </div>
      <div className=" w-full h-[calc(100vh-80px)] flex justify-between">
        <div>
          <Sidebar />
        </div>
        <div className=" w-full h-full px-5 py-12 ">
          <Breadcrums name={"Dashboard"} />
          <div className=" w-full h-full mt-2 rounded-xl shadow overflow-x-auto overflow-scroll scroll-display lg:px-5 py-2 px-0">
            {/* BOX 1 */}
            <div className="flex lg:flex-row flex-col lg:items-center justify-between gap-3 lg:px-0 px-2">
              <div className="lg:w-full w-[310px]  h-35 rounded-md flex justify-between items-center  px-5 gap-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold">
                <div className="flex flex-col justify-center">
                  <h1 className="text-3xl">{productTotal}</h1>
                  <h2 className="text-xl flex justify-between items-center">Total Items </h2>
                </div>
                <span className="text-5xl"><MdProductionQuantityLimits /></span>
              </div>
              <div className="lg:w-full w-[310px] h-35 rounded-md flex justify-between items-center  px-5 gap-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold">
                <div className="flex flex-col justify-center">
                  <h1 className="text-3xl">{orderTotal}</h1>
                  <h2 className="text-xl flex justify-between items-center">Total Orders</h2>
                </div>
                <span className="text-5xl"><TbTruckDelivery /></span>
              </div>
              <div className="lg:w-full w-[310px] h-35 rounded-md flex justify-between items-center  px-5 gap-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold">
                <div className="flex flex-col justify-center">
                  <h1 className="text-3xl">{"₹"} {amount}.00</h1>
                  <h2 className="text-xl flex justify-between items-center">Total Orders Amounts</h2>
                </div>
                <span className="text-5xl"><GiPayMoney /></span>
              </div>
              <div className="lg:w-full w-[310px] h-35 rounded-md flex justify-between items-center  px-5 gap-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold">
                <div className="flex flex-col justify-center">
                  <h1 className="text-3xl">{"₹"} {profilt}.00</h1>
                  <h2 className="text-xl flex justify-between items-center">Total Net Profit </h2>
                </div>
                <span className="text-5xl"><GiReceiveMoney /></span>
              </div> 
            </div>
            {/* BOX 2 */}
            <div className="mt-5 overflow-x-auto px-2 lg:px-0">
              <h1 className="text-2xl ">List of orders</h1>
              <table className="w-full border border-gray-300 rounded-xl mt-3">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold uppercase">
              <th className="py-4 px-6 text-left">ID</th>
              <th className="py-4 px-6 text-left">UserId</th>
              {/* <th className="py-4 px-6 text-left">address</th> */}
              <th className="py-4 px-6 text-left">paymentmethod</th>
              <th className="py-4 px-6 text-left">amount</th>
              <th className="py-4 px-6 text-left">status</th>
              <th className="py-6 px-6 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="">
            {orders?.map((category, index) => (
              <tr
                key={index + 1}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200 transition-all duration-300`}
              >
                <td className="py-4 px-6 font-medium text-gray-800">
                  {index + 1}
                </td>
                <td className="py-4 px-6 font-semibold text-gray-900">
                  {category.userId}
                </td>
                <td className="py-4 px-6 font-semibold text-gray-900">
                  {category.paymentMethod}
                </td>
                <td className="py-4 px-6 font-semibold text-gray-900">
                  {"₹"} {category.amount}
                </td>
                <td className="py-4 px-6 font-semibold text-gray-900">
                  {category.status}
                </td>
                <td className="py-4 px-6 font-semibold text-gray-900">
                  {new Date(category.date).toLocaleDateString()}
                </td>
           
              </tr>
            ))}
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
