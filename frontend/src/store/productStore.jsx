import { create } from "zustand";
import axios from "axios";
import { server } from "../App";

export const useProductStore = create((set) => ({
  Data: null,
  error: null,
  isLoading: false,
  message: null,

  productSingleGet: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${server}/api/product/get-single-product/${id}`);
      set({ Data: response.data.data, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error categoryAdd",
        isLoading: false,
      });
      throw error;
    }
  },

  ShopProductsGet: async (shopkeeperId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${server}/api/product/get-shopkeeper-prducts/${shopkeeperId}`);
      set({ Data: response.data.data, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error categoryAdd",
        isLoading: false,
      });
      throw error;
    }
  },

}));
