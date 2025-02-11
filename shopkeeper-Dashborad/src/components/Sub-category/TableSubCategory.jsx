import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { subcategoryStore } from "../../Store/subcategoryStore";

const TableSubCategory = () => {
  const navigateTo = useNavigate();

  const { subcategoryGet, Data, subcategoryDelete } = subcategoryStore();

  useEffect(() => {
    subcategoryGet();
  }, []);

  // Ensures data refreshes after deletion
  const removeCategory = async (productID) => {
    try {
      await subcategoryDelete(productID);
      await subcategoryGet();
      toast.success("SubCategory Deleted");
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  return (
    <div className="p-3 relative">
      <h2 className="text-2xl font-bold my-4 text-gray-800">
        Sub Category Table
      </h2>
      <div className="overflow-x-auto rounded-xl shadow-2xl">
        <table className="w-full border border-gray-300 rounded-xl">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <th className="py-4 px-6 text-left">ID</th>
              <th className="py-4 px-6 text-left">Image</th>
              <th className="py-4 px-6 text-left">SubCategory Name</th>
              <th className="py-4 px-6 text-left">Category Name</th>
              <th className="py-4 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(Data) && Data.length > 0 ? (
              Data.map((category, index) => (
                <tr
                  key={category._id}
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
                  <td className="py-4 px-6 font-semibold text-gray-900">
                    {Array.isArray(category.category) &&
                      category.category.map((item, i) => (
                        <div key={i}>{item.name}</div>
                      ))}
                  </td>
                  <td className="py-4 px-6 flex space-x-3">
                    <button
                      onClick={() =>
                        navigateTo(`/sub-category-update/${category._id}`)
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
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-600">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSubCategory;
