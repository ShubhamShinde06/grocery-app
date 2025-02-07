import { create } from "zustand";
import axios from "axios";

export const useProductStore = create((set) => ({
  Data: null,
  error: null,
  isLoading: false,
  message: null,

  productAdd: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        "/api/product/add-product",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }, // Set proper headers for file upload
        }
      );
      set({ Data: response.data.data, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error categoryAdd",
        isLoading: false,
      });
      throw error;
    }
  },

  productGet: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        "/api/product/get-product",
      );
      set({ Data: response.data.data, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error categoryAdd",
        isLoading: false,
      });
      throw error;
    }
  },

  productDelete: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.delete(
        `/api/product/delete-product/${id}`,
      );
      set({ Data: response.data.data, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error productDelete",
        isLoading: false,
      });
      throw error;
    }
  }
}));
