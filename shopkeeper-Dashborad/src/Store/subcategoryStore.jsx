import { create } from "zustand";
import axios from "axios";

export const subcategoryStore = create((set) => ({
  Data: null,
  error: null,
  isLoading: false,
  message: null,

  subcategoryAdd: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        "/api/subcategory/add-subcategory",
        formData,
      );
      set({ Data: response.data.data, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error SubcategoryAdd",
        isLoading: false,
      });
      throw error;
    }
  },

  subcategoryGet: async () => {
    set({isLoading: true, error: null})
    try {
      const response = await axios.get(
        "/api/subcategory/get-subcategory",
      );
      set({ Data: response.data.data, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error subcategoryGet",
        isLoading: false,
      });
      throw error;
    }
  },

  subcategoryPut: async (formData, id) => {
    set({isLoading: true, error: null})
    try {
      const response = await axios.put(
        `/api/subcategory/put-subcategory/${id}`, formData
      );
      set({ Data: response.data.data, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error subcategoryGet",
        isLoading: false,
      });
      throw error;
    }
  },

  subcategorySingleGet: async (id) => {
    set({isLoading: true, error: null})
    try {
      const response = await axios.get(
        `/api/subcategory/get-single-subcategory/${id}`,
      );
      set({ Data: response.data.data, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error subcategorySingleGet",
        isLoading: false,
      });
      throw error;
    }
  },

  subcategoryDelete: async (id) => {
    set({isLoading: true, error: null})
    try {
      const response = await axios.delete(
        `/api/subcategory/delete-subcategory/${id}`,
      );
      set({ Data: response.data.data, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error subcategoryDelete",
        isLoading: false,
      });
      throw error;
    }
  }
}));
