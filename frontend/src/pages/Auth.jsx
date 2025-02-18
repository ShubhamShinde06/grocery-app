import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Auth = () => {
  const [currentState, setCurrentState] = useState("Login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="w-full h-full flex flex-col lg:gap-0 gap-20 py-10">
        {/* header */}
        <div>
          <Header />
        </div>
        {/* login & sign_up */}
        <form className=" lg:h-[43vh] h-[20vh] flex flex-col items-center lg:justify-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
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
            <p className=" cursor-pointer">{currentState === "Login" ? "Forgot your password? " : ""}</p>
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
          <button className="bg-[#baf8ca] text-[#71f349] font-semibold px-8 py-2 mt-4">
            {currentState === "Login" ? "Sign in" : "Sign up"}
          </button>
        </form>
        <div>
          <Footer/>
        </div>
      </div>
    </>
  );
};

export default Auth;
