import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  //const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //await forgotPassword(email);
    //setIsSubmitted(true);
  };

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center lg:flex-row lg:justify-between lg:px-20 lg:py-10">
      {/* img */}
      <div className="w-1/2 h-full overflow-hidden rounded-4xl px-5 lg:block hidden">
        <img src="./login-img.png" alt="" className="w-full h-full" />
      </div>
      {/* form  */}
      <div className="lg:w-1/2 w-full flex items-center justify-center lg:px-10">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-2xl flex items-center justify-center font-bold leading-tight tracking-tight text-black">
            Forgot Pasword
          </h1>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <p className="text-gray-600 mb-6 text-center text-xl">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className=" lg:py-5 bg-[#F5F7F9] rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Email"
                  required=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-[#FF8035] w-full cursor-pointer rounded-2xl  text-xl text-white py-4 hover:scale-105 duration-300"
              >
                {"Send Reset Link"}
              </button>
              <p className=" font-light text-black flex items-center justify-center text-xl">
                <Link
                  to="/"
                  className=" flex items-center gap-1 text-black font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  <IoIosArrowBack className="text-xl" /> Back to Login
                </Link>
              </p>
            </form>
          ) : (
            <div className="text-center">
              <p className="text-gray-300 mb-6">
                If an account exists for {email}, you will receive a password
                reset link shortly.
              </p>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 flex items-center justify-center">
                <Link
                  to="/signin"
                  className=" flex items-center gap-1 text-white font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  <IoArrowBack className="text-xl" /> Back to Login
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
