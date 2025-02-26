import { create } from "zustand";
import axios from "axios";
import { server } from "../App";

export const orderStore = create((set) => ({
  Data: null,
  isLoading: false,
  error: null,
  message: null,

  placeOrder: async (orderData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${server}/api/order/place`, orderData);
      set({
        Data: response.data.data,
        isLoading: false,
        message: response.data.message,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error placeOrder",
        isLoading: false,
      });
      throw error;
    }
  },

  getOrder: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${server}/api/order/userorders/${userId}`,);
      set({
        Data: response.data.data,
        isLoading: false,
        message: response.data.message,
      });
      console.log(response.data.data)
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error placeOrder",
        isLoading: false,
      });
      throw error;
    }
  },
}));
