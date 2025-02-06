import React from 'react'

const TabelCategory = () => {
  return (
    <div className="w-full relative">
    <table className="w-full text-center mt-5">
      <thead>
        <tr className=" bg-white text-black h-[40px]">
          <th>Category Image</th>
          <th>Category Name</th>
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
  )
}

export default TabelCategory