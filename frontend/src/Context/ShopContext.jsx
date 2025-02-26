import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../App";
import { toast } from "react-toastify";
import { userAuthStore } from "../store/authStore";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const { user } = userAuthStore();
  const userId = user?._id;
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [cartCount, setCartCount] = useState(null);

  const addToCart = async (userId, itemId, size, finalPrice, shopId) => {
    if (!size) {
      toast.error("Select Item Size");
      return;
    }

    setCartItems((prevCart) => {
      let cartData = structuredClone(prevCart);

      if (!cartData[userId]) cartData[userId] = {};
      if (!cartData[userId][shopId]) cartData[userId][shopId] = {};
      if (!cartData[userId][shopId][itemId])
        cartData[userId][shopId][itemId] = {};
      if (!cartData[userId][shopId][itemId][size]) {
        cartData[userId][shopId][itemId][size] = {
          quantity: 1,
          finalPrice,
        };
      } else {
        cartData[userId][shopId][itemId][size].quantity += 1;
      }

      return cartData;
    });

    if (user) {
      try {
        const response = await axios.post(`${server}/api/cart/add`, {
          userId,
          itemId,
          size,
          finalPrice,
          shopId,
        });
        if (response.data.success) {
          setCartUpdated((prev) => !prev);
          toast.success(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const updateCartQuantity = async (userId, itemId, size, quantity) => {
    setCartItems((prevCartItems) => {
      const updatedCart = [...prevCartItems];

      // Find the item in the cart
      const itemIndex = updatedCart.findIndex(
        (item) => item.itemId === itemId && item.size === size
      );

      if (itemIndex !== -1) {
        if (quantity > 0) {
          // Update quantity
          updatedCart[itemIndex].quantity = quantity;
        } else {
          // Remove item from cart if quantity is 0
          updatedCart.splice(itemIndex, 1);
        }
      } else if (quantity > 0) {
        // Add new item to the cart
        updatedCart.push({
          itemId,
          size,
          quantity,
        });
      }

      return updatedCart;
    });

    // Send update to backend if user is logged in
    try {
      const response = await axios.post(`${server}/api/cart/update`, {
        userId,
        itemId,
        size,
        quantity,
      });

      if (response.data.success) {
        setCartUpdated((prev) => !prev);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Cart update error:", error);
      toast.error("Failed to update cart.");
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const item of cartItems) {
      try {
        if (item.quantity > 0) {
          totalAmount += item.finalPrice * item.quantity;
        }
      } catch (error) {
        console.error("Error calculating total:", error);
      }
    }

    return totalAmount;
  };

  const removeFromCart = async (userId, itemId, size, finalPrice, shopId) => {
    setCartItems((prevCartItems) => {
      const updatedCart = prevCartItems.filter(
        (item) =>
          !(
            item.userId === userId &&
            item.itemId === itemId &&
            item.size === size &&
            item.finalPrice === finalPrice &&
            item.shopId === shopId
          )
      );

      return updatedCart;
    });

    if (user) {
      try {
        const response = await axios.post(`${server}/api/cart/delete`, {
          shopId,
          itemId,
          size,
          userId,
          finalPrice,
        });
        if (response.data.success) {
          setCartUpdated((prev) => !prev);
          toast.success(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // Fetch Products
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${server}/api/product/get-product`);
      if (response.data.success) {
        setProducts(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching products");
    }
  };

  // Fetch User Cart
  const getUserCart = async () => {
    if (!userId) return;
    try {
      const response = await axios.post(`${server}/api/cart/get`, { userId });
      if (response.data.success) {
        setCartItems(response.data.cartData || []);
        setCartCount(response.data.totalCartCount || null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch Cart When User Logs In or `cartUpdated` Changes
  useEffect(() => {
    if (userId) {
      getUserCart();
    }
  }, [userId, cartUpdated]); 

  // Fetch Products on Component Mount
  useEffect(() => {
    getProductsData();
  }, []);

  const value = {
    products,
    setProducts,
    addToCart,
    cartItems,
    updateCartQuantity,
    cartCount,
    setCartCount,
    removeFromCart,
    getCartAmount,
    setCartUpdated
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
