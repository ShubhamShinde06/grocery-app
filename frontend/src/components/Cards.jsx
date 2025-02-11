import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Cards = () => {
  const responsive = {
    mac: { breakpoint: { max: 1280, min: 1280 }, items: 6 },
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 6 },
    desktop: { breakpoint: { max: 1024, min: 800 }, items: 3 },
    tablet: { breakpoint: { max: 800, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1.5 },
  };

  const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
    { id: 5, name: "Item 1" },
    { id: 6, name: "Item 2" },
    { id: 7, name: "Item 3" },
    { id: 8, name: "Item 4" },
  ];

  return (
    <div className="w-full">
      <div className="w-full flex justify-between">
        <h1 className="lg:text-2xl text-xl font-bold">Atta, Rice & Dal</h1>
        <button className="text-blue-500">See All</button>
      </div>
      <div>
        <Carousel responsive={responsive}>
          {items.map((item) => (
            <div key={item.id} className="p-4 h-60 bg-gray-200 rounded-lg text-center mr-3 mt-5">
              {item.name}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Cards;
