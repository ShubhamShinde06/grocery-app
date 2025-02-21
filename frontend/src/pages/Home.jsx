import React, { useEffect } from "react";
import Header from "../components/Header";
import Category from "../components/Category";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useState } from "react";

const Home = () => {

  const {products} = useContext(ShopContext)

  const [Baby, setBaby] = useState([])
  const [Atta, setAtta] = useState([])

  const BabyItems = products.filter((item) => 
    item.category.some((c) => c.name && c.name.includes("Baby Care"))
  );
  const AttaiIems = products.filter((item) => 
    item.category.some((c) => c.name && c.name.includes("Atta, Rice & Dal"))
  );

  useEffect(()=>{
    setBaby(BabyItems.slice(0,10))
    setAtta(AttaiIems.slice(0,10))
  },[products])
 


  

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
        {/* cards 1 */}
        <div className="lg:px-6 scroll-hover">
          <Cards Data={Atta} title={"Atta, Rice & Dal"} />
        </div>

        {/* cards 2 */}
        <div className="lg:px-6 scroll-hover">
          <Cards Data={Baby} title={"Baby Care"} />
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
