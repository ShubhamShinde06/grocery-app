import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { userAuthStore } from "../store/authStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Register from "./Register";

const Auth = () => {
  const navigate = useNavigate();
  const { isLoading, error, login, message } = userAuthStore();
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) toast.dismiss(); // Clear error messages
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password)
      //toast.success(message)     
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-10 py-10">
      <Header />
      {isLogin ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-[90%] lg:h-[55vh] h-[70vh]  sm:max-w-96 mx-auto mt-14 gap-4 text-gray-800"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <p className="prata-regular text-3xl">Login</p>
            <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
          </div>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleInputChange}
          />
          <div className="w-full flex justify-between text-sm">
            <p className="cursor-pointer"></p>
            <p onClick={() => setIsLogin(false)} className="cursor-pointer">
              Create account
            </p>
          </div>
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
          <button
            type="submit"
            className="bg-[#f87e2ddd] text-white font-semibold px-8 py-2 mt-4 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      ) : (
        <Register setCurrentState={setIsLogin} />
      )}
      <Footer />
    </div>
  );
};

export default Auth;
