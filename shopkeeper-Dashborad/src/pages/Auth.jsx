import React, { useState } from "react";
import Register from "./Register";
import { Link } from "react-router-dom";

const Auth = () => {
  const [auth, setAuth] = useState(true);

  return (
    <>
      {auth ? (
        <>
          <div className="w-full h-[100vh] flex flex-col justify-center items-center lg:flex-row lg:justify-between lg:px-20 lg:py-10">
            {/* img */}
            <div className="w-1/2 h-full overflow-hidden rounded-4xl px-5 lg:block hidden">
              <img src="./login-img.png" alt="" className="w-full h-full" />
            </div>
            {/* form  */}
            <form className=" lg:w-1/2 lg:px-20 px-2 ">
              <h2 class="font-bold text-4xl text-[#000000]">Login</h2>
              <p class="text-xl mt-4 text-[#9A9C9E]">
                If you are already a member, easily log in
              </p>

              <form class="flex flex-col gap-4">
                <input
                  class="px-2 mt-8 py-5 rounded-2xl  bg-[#F5F7F9]"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                <div class="relative">
                  <input
                    class="px-2 py-5 rounded-2xl bg-[#F5F7F9] w-full"
                    type="password"
                    name="password"
                    placeholder="Password"
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
                <button class="bg-[#FF8035] cursor-pointer rounded-2xl  text-xl text-white py-4 hover:scale-105 duration-300">
                  Login
                </button>
              </form>
              <div class="mt-5 text-xl border-b border-[#002D74] py-4 text-[#9A9C9E]">
                <Link to="/forgot-password">Forgot your password?</Link>
              </div>

              <div class="mt-3 text-xl flex justify-between items-center text-[#9A9C9E]">
                <p>Don't have an account?</p>
                <button onClick={()=>setAuth(false)} class="py-2 px-5 cursor-pointer bg-white border rounded-xl hover:scale-110 duration-300">
                  Register
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <Register auth={auth} setAuth={setAuth} />
        </>
      )}
    </>
  );
};

export default Auth;
