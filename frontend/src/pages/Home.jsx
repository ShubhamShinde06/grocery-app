import React, { useEffect } from "react";
import Header from "../components/Header";
import Category from "../components/Category";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import { CatAndSubStore } from "../store/CatAndSubStore";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

const Home = () => {

  const {products} = useContext(ShopContext)

  return (
    <div className="w-full h-full flex flex-col lg:gap-0 gap-20 py-10">
      {/* header */}
      <div>
        <Header />
      </div>
      <div className="w-full px-5 lg:mt-20 mt-10 flex flex-col gap-10">
        {/* poster */}
        <div className="w-full h-70  rounded-xl">
          <img
            src="https://binkeyit-full-stack-ydrn.vercel.app/assets/banner-CVOmu1PY.jpg"
            alt=""
            className="w-full h-full hidden lg:block"
          />
          <img
            src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/Pet-Care_WEB.jpg"
            alt=""
            className="w-full h-full lg:hidden"
          />
        </div>
        {/* category */}
        <div>
          <Category />
        </div>
        {/* cards */}
        <div className="lg:px-6 scroll-hover">
          <Cards Data={products} title={"Atta, Rice & Dal"} />
        </div>
        
        {/* footer */}
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
