import React from "react";

const TabelProduct = () => {
  return (
    <div className="w-full relative">
      <table className="w-full text-center mt-5">
        <thead>
          <tr className=" bg-white text-black h-[40px]">
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sub-Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <>
            <tr className="text-[#000000]" key={""}>
              <td className=" flex items-center gap-4">
                <img
                  src={""}
                  alt=""
                  className="w-[100px] h-auto border rounded-md"
                />
              </td>
              <td>Name</td>
              <td>₹ {2000}</td>
              <td>{"Rice"}</td>
              <td>5</td>
              <td className="">
                <button
                  //onClick={() => navigation(`/update/${item._id}`)}
                  className="bg-green-500 w-full text-white font-bold px-2 py-2 mb-2 rounded-md flex items-center justify-center"
                >
                  update{" "}
                </button>
                <button
                  //onClick={() => removeProduct(item._id)}
                  className="rounded-md w-full flex items-center justify-center px-2 py-2 bg-red-500 text-white font-bold"
                >
                  delete
                </button>
              </td>
            </tr>
          </>
        </tbody>
      </table>
    </div>
  );
};

export default TabelProduct;
