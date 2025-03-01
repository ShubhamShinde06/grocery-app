import { create } from "zustand";
import axios from "axios";

export const useCategoryStore = create((set) => ({
  Data: null,
  error: null,
  isLoading: false,
  message: null,

  categoryAdd: async (formData) => {
    // Remove 'name' parameter
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        "/api/category/add-category",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }, // Set proper headers for file upload
        },
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

  categoryGet: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`/api/category/get-category`, {
        headers: { "Content-Type": "multipart/form-data" }, // Set proper headers for file upload
      });
      set({ Data: response.data.data, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error categoryGet",
        isLoading: false,
      });
      throw error;
    }
  },

  categoryDelete: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.delete(
        `/api/category/delete-category/${id}`,
      );
      set({
        Data: Array.isArray(response.data.data) ? response.data.data : [],
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error categoryDelete",
        isLoading: false,
      });
      throw error;
    }
  },

  categoryPut: async (formData, id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(
        `/api/category/put-category/${id}`,
        formData, // Axios will handle the correct headers automatically
      );
      set({
        Data: Array.isArray(response.data.data) ? response.data.data : [],
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error categoryPut",
        isLoading: false,
      });
      throw error;
    }
  },

  categorySingleGet: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `/api/category/get-single-category/${id}`,
      );
      set({
        Data: Array.isArray(response.data.data) ? response.data.data : [],
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error categoryDelete",
        isLoading: false,
      });
      throw error;
    }
  },
}));
