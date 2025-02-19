import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { userAuthStore } from "../store/authStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const [currentState, setCurrentState] = useState("Login");
  const { signup, message, isLoading, error, login } = userAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentState === "Login") {
      try {
        await login(email, password);
        //navigate("/home");
        toast.success(error);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else {
      try {
        await signup(name, email, password);
        toast.success(error);
        //navigate("/verify-email");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <div className="w-full h-full flex flex-col lg:gap-0 gap-20 py-10">
        {/* header */}
        <div>
          <Header />
        </div>
        {/* login & sign_up */}
        <form
          onSubmit={handleSubmit}
          className=" lg:h-[43vh] h-[20vh] flex flex-col items-center lg:justify-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
        >
          <div className="inline-flex items-center gap-2 mb-2 mt-10">
            <p className=" prata-regular text-3xl">{currentState}</p>
            <hr className=" border-none h-[1.5px] w-8 bg-gray-800" />
          </div>
          {currentState === "Login" ? (
            ""
          ) : (
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-800"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="w-full flex justify-between text-sm mt-[-8px]">
            <p className=" cursor-pointer">
              {currentState === "Login" ? "Forgot your password? " : ""}
            </p>
            {currentState === "Login" ? (
              <p
                onClick={() => setCurrentState("Sign Up")}
                className=" cursor-pointer"
              >
                Create account
              </p>
            ) : (
              <p
                onClick={() => setCurrentState("Login")}
                className=" cursor-pointer"
              >
                Login here
              </p>
            )}
          </div>
          {error && <p className=" text-red-500 font-semibold mt-2 border">{error}</p>}
          {currentState === "Login" ? (
            <button className="bg-[#f87e2ddd] text-[#FFFFFF] font-semibold px-8 py-2 mt-4 cursor-pointer">
              {isLoading ? "Loading..." : "Login"}
            </button>
          ) : (
            <button className="bg-[#f87e2ddd] text-[#FFFFFF] font-semibold px-8 py-2 mt-4 cursor-pointer">
              {isLoading ? "Loading..." : "Sign up"}
            </button>
          )}
        </form>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Auth;
