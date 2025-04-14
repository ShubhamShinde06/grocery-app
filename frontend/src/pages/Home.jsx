import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Category from "../components/Category";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import { ShopContext } from "../Context/ShopContext";
import CartFooter from "../components/CartFooter";

const Home = () => {
  const { products } = useContext(ShopContext);
  const [categorizedProducts, setCategorizedProducts] = useState({});

  useEffect(() => {
    if (products.length === 0) return;
  
    // Extract unique categories with _id
    const categories = [
      ...new Map(
        products.flatMap((item) =>
          item.category.map((c) => [c._id, { name: c.name, shopkeeperId: item.shopkeeperId }])
        )
      ).entries(),
    ].map(([id, { name, shopkeeperId }]) => ({ id, name, shopkeeperId }));
  
    // Group products by category (limit 10 per category)
    const categoryMap = {};
    categories.forEach(({ id, name, shopkeeperId }) => {
      categoryMap[id] = {
        name,
        shopkeeperId,
        products: products
          .filter((item) => item.category.some((c) => c._id === id))
          .slice(0, 10),
      };
    });
  
    setCategorizedProducts(categoryMap);
  }, [products]);


  

  return (
    <div className="w-full h-full flex flex-col lg:gap-0 gap-20 py-10 relative">
      {/* Header */}
      <Header />

      <div className="w-full px-5 lg:mt-20 mt-[135px] flex flex-col gap-10">
        {/* Banner */}
        <div className="w-full h-70 rounded-xl">
          <img
            src="https://binkeyit-full-stack-ydrn.vercel.app/assets/banner-CVOmu1PY.jpg"
            alt="Banner"
            className="w-full h-full hidden lg:block"
          />
          <img
            src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/Pet-Care_WEB.jpg"
            alt="Mobile Banner"
            className="w-full h-full lg:hidden"
          />
        </div>

        {/* Categories */}
        <Category />

        {/* Dynamically Render Products for Each Category */}
        {Object.entries(categorizedProducts).map(([id, { name, products }]) => (
          <div key={id} className="lg:px-6 scroll-hover">
            <Cards Data={products} title={name} text={'see more'} link={id}/>
          </div>
        ))}

        {/* Footer */}
        <Footer />
      </div>
      <div className=" fixed bottom-2 w-full h-15 px-2 lg:hidden block">
        <CartFooter/>
      </div>
    </div>
  );
};

export default Home;
