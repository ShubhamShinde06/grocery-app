import React, { useContext, useEffect, useState } from "react";
import CartTotal from "../components/CartTotal";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import logo2 from "../assets/razorpay_logo.png";
import logo1 from "../assets/stripe_logo.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { server } from "../App";
import { ShopContext } from "../Context/ShopContext";
import { userAuthStore } from "../store/authStore";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const [method, setMethod] = useState("cod");
  const { getCartAmount, products, cartItems, cartUpdated, setCartUpdated, delivery } = useContext(ShopContext);
  const { user } = userAuthStore();
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(null);

  useEffect(() => {
    if (cartItems) {
      cartItems.map((item) => {
        setSize(item.size);
        setQuantity(item.quantity);
      });
    }
  }, [cartUpdated]);

  const [formData, setFromData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFromData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      for (const cartItem of cartItems) {
        if (cartItem.quantity > 0) {
          const itemInfo = structuredClone(
            products.find((product) => product._id === cartItem.itemId)
          );

          if (itemInfo) {
            orderItems.push(itemInfo);
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("Your cart is empty!");
        return;
      }
      const shopkeeperId = orderItems[0]?.shopkeeper._id;

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery,
        shopId: shopkeeperId,
        userId: user?._id, // Attach userId correctly
        paymentMethod: method === "cod" ? "COD" : "Stripe",
        size: size,
        quantity: quantity,
      };

      

      switch (method) {
        case "cod":
          const response = await axios.post(
            server + "/api/order/place",
            orderData
          );
          if (response.data.success) {
            setCartUpdated((prev) => !prev);
            navigate("/order");
            toast.success(response.data.message);
            console.log(response.data.message)
          } else {
            toast.error(response.data.message);
            console.log(response.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            server + "/api/order/stripe",
            orderData
          );

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        default:
          toast.error("Invalid payment method");
          break;
      }
    } catch (error) {
      console.error("Order Error:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while placing your order."
      );
    }
  };

  

  return (
    <>
      <div className="w-full h-full">
        <Header />
        <div className="w-full h-[calc(100vh-20vh)] lg:mt-25 mt-40 lg:px-10 px-2">
          <form
            onSubmit={onSubmitHandler}
            className=" flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 border-t"
          >
            {/* left side */}
            <div className="flex flex-col gap-4 w-full sm:max-w-[680px]">
              <div className="text-xl sm:text-2xl my-3">
                {/* <Title text1={'DELIVERY'} text2={'INFORMATION'}/> */}
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                  placeholder="First name"
                  onChange={onChangeHandler}
                  name="firstName"
                  value={formData.firstName}
                  required
                />
                <input
                  type="text"
                  className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                  placeholder="Last name"
                  onChange={onChangeHandler}
                  name="lastName"
                  value={formData.lastName}
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                  placeholder="Enter email"
                  onChange={onChangeHandler}
                  name="email"
                  value={formData.email}
                  required
                />
                <input
                  type="text"
                  className="border border-gray-300 rounded py-1.5 px-3.5 w-full mt-[14px]"
                  placeholder="Street"
                  onChange={onChangeHandler}
                  name="street"
                  value={formData.street}
                  required
                />
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                  placeholder="City"
                  onChange={onChangeHandler}
                  name="city"
                  value={formData.city}
                  required
                />
                <input
                  type="text"
                  className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                  placeholder="State"
                  onChange={onChangeHandler}
                  name="state"
                  value={formData.state}
                  required
                />
              </div>
              <div className="flex gap-3">
                <input
                  type="number"
                  className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                  placeholder="Zipcode"
                  onChange={onChangeHandler}
                  name="zipcode"
                  value={formData.zipcode}
                  required
                  min={1}
                />
                <input
                  type="text"
                  className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                  placeholder="Country"
                  onChange={onChangeHandler}
                  name="country"
                  value={formData.country}
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                  placeholder="Phone"
                  onChange={onChangeHandler}
                  name="phone"
                  value={formData.phone}
                  required
                />
              </div>
            </div>

            {/* right side */}
            <div className="mt-8">
              <div className="mt-8 min-w-80">
                <CartTotal />
              </div>
              <div className="mt-12">
                {/* <Title text1={'PAYMENT'} text2={'METHOD'}/> */}
                {/* payment */}
                <div className="flex gap-3 flex-col lg:flex-row">
                  <div
                    onClick={() => setMethod("stripe")}
                    className=" flex items-center gap-3 border p-2 px-3 cursor-pointer"
                  >
                    <p
                      className={`min-w-3.5 h-3.5 border rounded-full ${
                        method === "stripe" ? " bg-green-400" : ""
                      }`}
                    ></p>
                    <img src={logo1} alt="stripe_logo" />
                  </div>

                  <div
                    onClick={() => setMethod("razorpay")}
                    className=" flex items-center gap-3 border p-2 px-3 cursor-pointer"
                  >
                    <p
                      className={`min-w-3.5 h-3.5 border rounded-full ${
                        method === "razorpay" ? " bg-green-400" : ""
                      }`}
                    ></p>
                    <img src={logo2} alt="razorpay_logo" />
                  </div>

                  <div
                    onClick={() => setMethod("cod")}
                    className=" flex items-center gap-3 border p-2 px-3 cursor-pointer"
                  >
                    <p
                      className={`min-w-3.5 h-3.5 border rounded-full ${
                        method === "cod" ? " bg-green-400" : ""
                      }`}
                    ></p>
                    <p className="text-gray-500 text-sm font-medium mx-4">
                      CASH ON DELIVERY
                    </p>
                  </div>
                </div>

                <div className="w-full text-end mt-8">
                  {/* <Link to={'/orders'}> */}
                  <button
                    type="submit"
                    className="bg-black text-white px-16 py-3 text-sm  cursor-pointer"
                  >
                    PLACE ORDER
                  </button>
                  {/* </Link> */}
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="lg:mt-0 mt-50">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
