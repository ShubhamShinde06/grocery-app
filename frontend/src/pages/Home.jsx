import React from "react";
import Header from "../components/Header";
import Category from "../components/Category";
import Cards from "../components/Cards";
import Footer from "../components/Footer";

const Home = () => {
  const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
    { id: 5, name: "Item 1" },
    { id: 6, name: "Item 2" },
    { id: 7, name: "Item 3" },
    { id: 7, name: "Item 3" },
    { id: 7, name: "Item 3" },
    { id: 7, name: "Item 3" },
  ];

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
          <Cards Data={items} title={"Atta, Rice & Dal"} />
        </div>
         {/* cards */}
         <div className="lg:px-6 scroll-hover">
          <Cards Data={items} title={"Home & office"} />
        </div>
         {/* cards */}
         <div className="lg:px-6 scroll-hover">
          <Cards Data={items} title={"Baby Care"} />
        </div>
         {/* cards */}
         <div className="lg:px-6 scroll-hover">
          <Cards Data={items} title={"Bakery & Bisuits"} />
        </div>
         {/* cards */}
         <div className="lg:px-6 scroll-hover">
          <Cards Data={items} title={"Breakfast & instant food"} />
        </div>
         {/* cards */}
         <div className="lg:px-6 scroll-hover">
          <Cards Data={items} title={"Pet Care"} />
        </div>
         {/* cards */}
         <div className="lg:px-6 scroll-hover">
          <Cards Data={items} title={"Sweet Tooth"} />
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
