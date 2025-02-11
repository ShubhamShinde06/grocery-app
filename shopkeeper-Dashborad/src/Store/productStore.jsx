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
      const response = await axios.post("/api/product/add-product", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Set proper headers for file upload
      });
      set({ Data: response.data.data, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error categoryAdd",
        isLoading: false,
      });
      throw error;
    }
  },

  productGet: async (id) => {
    console.log("Fetching products for ID:", id); // Debugging log
    if (!id) {
        set({ error: "Shopkeeper ID is missing", isLoading: false });
        return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`/api/product/get-owner-product/${id}`);
      set({ Data: response.data.data, isLoading: false });
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      set({
        error: error.response?.data?.message || "Error fetching products",
        isLoading: false,
      });
      throw error;
    }
},


  productDelete: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.delete(`/api/product/delete-product/${id}`);
      set({ Data: response.data.data, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error productDelete",
        isLoading: false,
      });
      throw error;
    }
  },

  productPut: async (formData, id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`/api/product/put-product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Set proper headers for file upload
      });
      set({ Data: response.data.data, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error categoryAdd",
        isLoading: false,
      });
      throw error;
    }
  },

  productSingleGet: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `/api/product/get-owner-product/${id}`
      );
      set({ Data: Array.isArray(response.data.data) ? response.data.data : [], isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error categoryDelete",
        isLoading: false,
      });
      throw error;
    }
  }
}));
