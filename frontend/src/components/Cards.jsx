import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "./Card";

const Cards = (props) => {
  const responsive = {
    mac: { breakpoint: { max: 1280, min: 1280 }, items: 6 },
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 6 },
    desktop: { breakpoint: { max: 1024, min: 800 }, items: 3 },
    tablet: { breakpoint: { max: 800, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1.5 },
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between">
        <h1 className="lg:text-2xl text-xl font-bold">{props.title}</h1>
        <button className="text-blue-500">{props.link}</button>
      </div>
      <Carousel
        responsive={responsive}
        arrows={true}
        itemClass="!w-[180px] !flex-none !mr-8"
      >
        {props.Data.map((item, index) => (
          <Card
            key={item._id} // Add key for optimization
            index={index + 1}
            id={item._id}
            name={item.name}
            price={item.discount}
            unit={item.unit}
            image={item.image}
            quantity={item.quantity} // Remove unnecessary array wrapping
          />
        ))}
      </Carousel>
    </div>
  );
};

export default Cards;
