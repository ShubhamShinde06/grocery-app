import React, { useEffect, useState } from "react";
import { useCategoryStore } from "../../Store/categoryStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Store/authStore";

const TabelCategory = ({ data }) => {
  const navigatTo = useNavigate();

  const { categoryDelete, categoryGet } = useCategoryStore();

  useEffect(() => {
    categoryGet();
  }, []);

  const removeCategory = async (productID) => {
    try {
      await categoryDelete(productID);
      await categoryGet();
      toast.success("Category Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 relative">
      <h2 className="text-2xl font-bold my-4 text-gray-800">Category Table</h2>
      <div className="overflow-x-auto rounded-xl shadow-2xl">
        <table className="w-full border border-gray-300 rounded-xl">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <th className="py-4 px-6 text-left">ID</th>
              <th className="py-4 px-6 text-left">Image</th>
              <th className="py-4 px-6 text-left">Category Name</th>
              <th className="py-4 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {data?.map((category, index) => (
              <tr
                key={index + 1}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200 transition-all duration-300`}
              >
                <td className="py-4 px-6 font-medium text-gray-800">
                  {index + 1}
                </td>
                <td className="py-4 px-6">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-16 h-16 object-cover rounded-lg shadow-md"
                  />
                </td>
                <td className="py-4 px-6 font-semibold text-gray-900">
                  {category.name}
                </td>
                <td className="py-4 px-6 flex space-x-3">
                  <button
                    onClick={() =>
                      navigatTo(`/category-update/${category._id}`)
                    }
                    className="bg-green-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-green-600 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => removeCategory(category._id)}
                    className="bg-red-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelCategory;
