import React, { useState } from "react";
import { useAuthStore } from "../Store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const PasswordSet = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, error, isLoading, message } = useAuthStore();

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password Do Not Match");
    }
    await resetPassword(token, password);
    navigate("/home");
    toast.success("Password reset successfully");
  };

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center lg:flex-row lg:justify-between lg:px-20 lg:py-10">
      {/* img */}
      <div className="w-1/2 h-full overflow-hidden rounded-4xl px-5 lg:block hidden">
        <img src="/login-img.png" alt="" className="w-full h-full" />
      </div>
      {/* form  */}
      <div className="lg:w-1/2 w-full flex items-center justify-center">
        <div className=" text-black w-[100%] flex flex-col items-center justify-center px-2 lg:px-10 py-8 lg:py-0">
          <div className="w-full  rounded-lg ">
            <div className="p-6 space-y-4 md:space-y-6">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-black pb-6 lg:pb-3">
                Reset Password
              </h1>
              {error && (
                <p className=" text-red-500 font-semibold mt-2">{error}</p>
              )}
              {message && (
                <p className=" text-green-500 font-semibold mt-2">{message}</p>
              )}
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-xl font-medium text-black"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className=" lg:py-5 bg-[#F5F7F9] rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-xl font-medium text-black"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className=" lg:py-5 bg-[#F5F7F9] rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required=""
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#FF8035] w-full cursor-pointer rounded-2xl  text-xl text-white py-4 hover:scale-105 duration-300 flex items-center justify-center"
                >
                  {isLoading ? "Resetting.." : "Set New Password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordSet;
