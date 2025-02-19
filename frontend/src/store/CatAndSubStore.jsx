import { create } from "zustand";
import axios from "axios";
import { server } from "../App"; 

axios.defaults.withCredentials = true;

export const CatAndSubStore = create((set) => ({
    Data: null,
    isLoading: false,
    error: null,
    message: null,

    CategoryGet: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.get(
            `${server}/api/category/get-category`
          );
          set({ Data: response.data.data, isLoading: false });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Error categoryGet",
            isLoading: false,
          });
          throw error;
        }
      }
    

}));