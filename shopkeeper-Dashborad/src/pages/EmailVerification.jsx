import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useAuthStore } from "../Store/authStore";
import {toast} from 'react-toastify'

const EmailVerification = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { verifyEmail, isAuthenticted, error, isLoading } = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];

    //handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      //focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < s ? lastFilledIndex + 1 : s;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      //move focus to the  next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKayDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationcode = code.join("");
    try {
      await verifyEmail(verificationcode);
      navigate("/home");
      toast.success("Email verified successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <>
        <div className="w-full h-[100vh] flex flex-col justify-center items-center lg:flex-row lg:justify-between lg:px-20 lg:py-10">
          {/* img */}
          <div className="w-1/2 h-full overflow-hidden rounded-4xl px-5 lg:block hidden">
            <img src="./login-img.png" alt="" className="w-full h-full" />
          </div>
          {/* form  */}
          <div className="lg:w-1/2 w-full  flex items-center justify-center">
            <div class=" text-black w-full flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 ">
            <div className="w-full flex items-center justify-start lg:px-20 text-xl pb-10 lg:pb-0">
                <button className="flex items-center gap-2 cursor-pointer" onClick={()=>navigate('/')}><IoIosArrowBack /> Back</button>
            </div> 
            <div className="w-full bg-transparent rounded-lg">
                <div className="p-0 space-y-4 md:space-y-6 sm:p-20">
                  <h1 className="text-2xl font-bold leading-tight tracking-tight text-black text-center">
                    Verify Your Email
                  </h1>
                  <p className=" leading-tight tracking-tight text-black text-center lg:text-xl">
                    Enter the 6-digit code sent to your email address.
                  </p>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 md:space-y-6"
                    action="#"
                  >
                    <div className="flex justify-between gap-3">
                      {code.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (inputRefs.current[index] = el)}
                          type="text"
                          maxLength="6"
                          value={digit}
                          onChange={(e) => handleChange(index, e.target.value)}
                          onKeyDown={(e) => handleKayDown(index, e)}
                          //disabled={isLoading || code.some((digit) => !digit)}
                          className="border border-gray-300  rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 lg:py-5 bg-[#F5F7F9] text-black text-center text-xl"
                          required=""
                        />
                      ))}
                    </div>
                    {error && (
              <p className=" text-red-500 font-semibold mt-2">{error}</p>
            )}
                    <button
                      type="submit"
                      className="bg-[#FF8035] w-full cursor-pointer rounded-2xl  text-xl text-white py-4 hover:scale-105 duration-300 flex items-center justify-center"
                    >
                      {isLoading ? "Verifying..." : "Verify Email"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default EmailVerification;
