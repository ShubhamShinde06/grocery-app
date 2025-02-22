import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { userAuthStore } from "../store/authStore";
import { toast } from "react-toastify";

const Register = ({ setCurrentState }) => {
  const { isLoading, error, signup, message } = userAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      toast.success(message)
    } catch (error) {
      console.log(error);
      toast.error(error || "database down");
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
          className=" lg:h-[55vh] h-[60vh] flex flex-col items-center lg:justify-center w-[90%]  sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
        >
          <div className="inline-flex items-center gap-2 mb-2 mt-10">
            <p className=" prata-regular text-3xl">{"Sign Up"}</p>
            <hr className=" border-none h-[1.5px] w-8 bg-gray-800" />
          </div>

          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            <p
              onClick={() => setCurrentState(true)}
              className=" cursor-pointer"
            >
              Login here
            </p>
          </div>
          {error && (
            <p className=" text-red-500 font-semibold mt-2">{error}</p>
          )}

          <button className="bg-[#f87e2ddd] text-[#FFFFFF] font-semibold px-8 py-2 mt-4 cursor-pointer">
            {isLoading ? "Loading..." : "Sign up"}
          </button>
        </form>
        {/* <div>
          <Footer />
        </div> */}
      </div>
    </>
  );
};

export default Register;
