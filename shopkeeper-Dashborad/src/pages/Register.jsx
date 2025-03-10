import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useAuthStore } from "../Store/authStore";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

const Register = ({ setAuth }) => {
  const navigate = useNavigate();

  const [nextStep, setNextStep] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shopName, setShopname] = useState("");
  const [phoneNumber, setContect] = useState("");
  const [street, setStreet] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");

  const { signup, error, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(
        email,
        password,
        name,
        shopName,
        phoneNumber,
        street,
        state,
        city,
        zipcode,
      );
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
      toast.error(error || "database down");
    }
  };

  return (
    <>
      <div className="w-full h-[100vh] flex flex-col lg:flex-row-reverse justify-center items-center  lg:justify-between lg:px-20 lg:py-10 px-2">
        {/* img */}
        <div className="w-1/2 h-full overflow-hidden rounded-4xl px-5 lg:block hidden">
          <img src="./login-img.png" alt="" className="w-full h-full" />
        </div>
        {/* form  */}
        <form
          onSubmit={handleSubmit}
          className=" lg:w-1/2 lg:px-20 px-2 w-full"
        >
          <h2 className="font-bold text-4xl text-[#000000]">Register</h2>
          <p className="text-xl mt-4 text-[#9A9C9E]">
            {nextStep ? "Step 1" : "Step 2"}
          </p>
          <div class="flex flex-col gap-4">
            {nextStep ? (
              <>
                <input
                  className="px-2 mt-8 py-5 rounded-2xl  bg-[#F5F7F9]"
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="px-2 py-5 rounded-2xl  bg-[#F5F7F9]"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div class="relative">
                  <input
                    className="px-2 py-5 rounded-2xl bg-[#F5F7F9] w-full"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="gray"
                    class="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                  </svg>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setNextStep(false)}
                    className="hover:bg-[#F5F7F9] w-1/2 cursor-pointer rounded-2xl  text-xl hover:text-black bg-[#FF8035] text-white py-4 hover:scale-105 duration-300"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <>
                <input
                  className="px-2 mt-8 py-5 rounded-2xl  bg-[#F5F7F9]"
                  type="text"
                  name="shopname"
                  placeholder="Shopname"
                  required
                  value={shopName}
                  onChange={(e) => setShopname(e.target.value)}
                />
                <input
                  className="px-2 py-5 rounded-2xl  bg-[#F5F7F9]"
                  type="number"
                  name="contact number"
                  placeholder="contact number"
                  value={phoneNumber}
                  onChange={(e) => setContect(e.target.value)}
                />
                <input
                  className="px-2 py-5 rounded-2xl  bg-[#F5F7F9]"
                  type="text"
                  name="Street"
                  placeholder="Street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
                <input
                  className="px-2 py-5 rounded-2xl  bg-[#F5F7F9]"
                  type="text"
                  name="State"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                <input
                  className="px-2 py-5 rounded-2xl  bg-[#F5F7F9]"
                  type="text"
                  name="City"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <input
                  className="px-2 py-5 rounded-2xl  bg-[#F5F7F9]"
                  type="number"
                  name="Zip code"
                  placeholder="Zip code"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                />
                {error && (
                  <p className=" text-red-500 font-semibold mt-2">{error}</p>
                )}
                <div className="flex items-center justify-between gap-8">
                  <button
                    onClick={() => setNextStep(true)}
                    className="hover:bg-[#F5F7F9] w-1/2 cursor-pointer rounded-2xl  text-xl hover:text-black bg-[#FF8035] text-white py-4 hover:scale-105 duration-300"
                  >
                    Back
                  </button>
                  <button className="bg-[#FF8035] w-1/2 cursor-pointer rounded-2xl  text-xl text-white py-4 hover:scale-105 duration-300 flex items-center justify-center">
                    {isLoading ? <Loading /> : "Sign up"}
                  </button>
                </div>
              </>
            )}
          </div>

          {nextStep ? (
            <>
              <div className="mt-5 text-xl border-b border-[#002D74] py-4 text-[#9A9C9E]"></div>

              <div className="mt-3 text-xl flex justify-between items-center text-[#9A9C9E]">
                <p>You have an account?</p>
                <button
                  onClick={() => setAuth(true)}
                  className="py-2 px-5 cursor-pointer bg-white border rounded-xl hover:scale-110 duration-300"
                >
                  Login
                </button>
              </div>
            </>
          ) : (
            ""
          )}
        </form>
      </div>
    </>
  );
};

export default Register;
