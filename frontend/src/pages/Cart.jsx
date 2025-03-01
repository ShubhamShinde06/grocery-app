import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { userAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import CartTotal from "../components/CartTotal";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Cart = () => {
  const { products, cartItems, updateCartQuantity, removeFromCart } = useContext(ShopContext);
  const { user } = userAuthStore();
  const userId = user?._id;
  const navigate = useNavigate();

  if (!cartItems || !userId) {
    return <p className="text-center text-gray-500 mt-5">Loading cart...</p>;
  }

  console.log(cartItems)

  return (
    <>
      <div className="w-full h-full flex flex-col py-10">
        <Header />
        <div className="border-t pt-14 lg:px-10 px-5">
          {/* Cart Heading */}
          <div className="text-2xl mb-6 flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="inline-flex gap-2 items-center">
              <p className="text-gray-500">
                YOUR <span className="text-gray-700 font-medium">CART</span>
              </p>
              <span className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></span>
            </div>
          </div>

          {/* Cart Items */}
          <div>
            {cartItems.map((item, index) => {
              const productData = products.find(
                (product) => product._id === item.itemId
              );

              if (!productData) return null; // Skip rendering if product data is missing
              return (
                <div
                  key={index}
                  className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_1fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* Product Image */}
                    <img
                      src={productData.image?.[0] || ""}
                      className="w-16 sm:w-20 cursor-pointer rounded-md"
                      alt={productData.name}
                      onClick={() => navigate(`/product/${item.itemId}`)}
                    />

                    <div>
                      {/* Product Name */}
                      <p
                        className="text-sm sm:text-lg font-medium cursor-pointer hover:text-blue-600"
                        onClick={() => navigate(`/product/${item.itemId}`)}
                      >
                        {productData.name}
                      </p>

                      {/* Price & Size */}
                      <div className="flex items-center gap-3 mt-2">
                        <p className="font-semibold text-gray-900">
                          ₹ {item.finalPrice}
                        </p>
                        x
                        <p className="px-3 py-1 border bg-gray-100 text-sm rounded-md">
                          {item.size}{" "}{productData.unit}
                        </p>
                        PACK
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      className="border px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
                      onClick={() => {
                        if (item.quantity > 1) {
                          updateCartQuantity(
                            userId,
                            item.itemId,
                            item.size,
                            item.quantity - 1
                          );
                        }
                      }}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="border w-12 text-center py-1 rounded-md"
                      value={item.quantity}
                      min={1}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value > 0) {
                          updateCartQuantity(
                            userId,
                            item.itemId,
                            item.size,
                            value
                          );
                        }
                      }}
                    />
                    <button
                      className="border px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
                      onClick={() => {
                        updateCartQuantity(
                          userId,
                          item.itemId,
                          item.size,
                          item.quantity + 1
                        );
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Delete Button */}
                  <div
                    className="flex items-center text-xl text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() =>
                      removeFromCart(
                        userId,
                        item.itemId,
                        item.size,
                        item.finalPrice,
                        item.shopId
                      )
                    }
                  >
                    <FaRegTrashCan />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Total & Proceed to Order */}
          <div className="flex justify-end my-10 w-full">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <div className="w-full text-end">
                {cartItems.length > 0 && (
                  <Link to="/place-order">
                    <button className="bg-[#F77F30] text-white font-bold text-sm my-8 px-8 py-3 rounded-md hover:bg-[#e66c25] transition-all">
                      PROCEED TO ORDER
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Cart;
