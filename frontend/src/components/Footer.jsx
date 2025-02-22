import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-5  text-sm px-5">
        <div>
          <Link to={"/home"}>
            <img src={"/logo.png"} alt="logo" className="w-40 h-[180px] lg:-mt-14" />
          </Link>
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
            quisquam maiores et odit accusamus a ut possimus consequatur quis
            ea!
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li className="  cursor-pointer">Home</li>
            <li className="  cursor-pointer">About us</li>
            <li className="  cursor-pointer">Delivery</li>
            <li className="  cursor-pointer">Privacy policy</li>
          </ul>
        </div>

        <div className=" flex flex-col items-end">
          <p className="text-xl font-medium mb-5 text-start">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91 9892436548</li>
            <li>shoopfinity@gamil.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025@ shoopfinity.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
