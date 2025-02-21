import React, { useEffect } from "react";
import { CatAndSubStore } from "../store/CatAndSubStore";

const OwnerHeader = ({ setBtn }) => {
  const { CategoryGet, Data, isLoading } = CatAndSubStore();

  useEffect(() => {
    CategoryGet();
  }, []);

  return (
    <div className=" w-full flex flex-wrap gap-5 justify-center ">
      <>
        {Data?.map((item, index) => (
          <div
            key={index + 1}
            className="md:w-32 md:h-40 w-15 h-30 overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() =>
                setBtn(
                  (prev) =>
                    prev.includes(item.name)
                      ? prev.filter((category) => category === item.name) // Remove if already selected
                      : [item.name] // Add if not selected
                )
              }
            />
          </div>
        ))}
      </>
    </div>
  );
};

export default OwnerHeader;
