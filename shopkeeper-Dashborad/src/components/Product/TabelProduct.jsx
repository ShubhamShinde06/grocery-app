import React, { useEffect, useState } from "react";
import { useProductStore } from "../../Store/productStore";
import { toast } from "react-toastify";
import { useAuthStore } from "../../Store/authStore";

const TabelProduct = ({Data}) => {
  const { productDelete, productGet  } = useProductStore();
  const { user } = useAuthStore();
  
  const [id, setID] = useState('');

  useEffect(() => {
    if (user && user._id) {
      setID(user._id);
    }
  }, [user]);
  
  useEffect(() => {
    if (id) {
      productGet(id);
    }
  }, [id]);

 
  

  // Ensures data refreshes after deletion
  const removeCategory = async (productId) => {
    try {
      await productDelete(productId);
      await productGet(id); // Use correct shopkeeper ID
      toast.success("Product Deleted");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="p-3 relative">
      <h2 className="text-2xl font-bold my-4 text-gray-800">Products Table</h2>
      <div className="overflow-x-auto rounded-xl shadow-2xl">
        <table className="w-full border border-gray-300 rounded-xl">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <th className="py-4 px-6 text-left">ID</th>
              <th className="py-4 px-6 text-left">Image</th>
              <th className="py-4 px-6 text-left">Product Name</th>
              <th className="py-4 px-6 text-left">Category Name</th>
              <th className="py-4 px-6 text-left">SubCategory Name</th>
              <th className="py-4 px-6 text-left">Price</th>
              <th className="py-4 px-6 text-left">Unit</th>
              <th className="py-4 px-6 text-left">Stock</th>
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
                      src={category.image[0]}
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
                  <td className="py-4 px-6 font-semibold text-gray-900">
                    {Array.isArray(category.subCategory) &&
                      category.subCategory.map((item, i) => (
                        <div key={i}>{item.name}</div>
                      ))}
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-900">
                    {category.price}
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-900">
                    {category.quantity.map((item) => (
                      <div className=" flex gap-1">
                      <p>{item}</p><p>{category.unit}</p>
                      </div>
                    ))}
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-900">
                    {category.stock ? "In Stock" : "Out Of Stock"}
                  </td>
                  <td className="py-4 px-6 flex space-x-3">
                    {/* <button
                      onClick={() => navigateTo(`/product-update/${category._id}`)}
                      className="bg-green-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-green-600 transition"
                    >
                      Update
                    </button> */}
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
                <td colSpan="9" className="text-center py-4 text-gray-600">
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

export default TabelProduct;
