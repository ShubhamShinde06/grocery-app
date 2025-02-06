import {create} from 'zustand'
import axios from 'axios'

export const useCategoryStore = create((set) => ({
    Data: null,
    error:null,
    isLoading: false,
    message: null,

    categoryAdd: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post("/api/auth/shopkeeper/signup", {
                
            });
            set({ Data: response.data.data, isLoading: false});
        } catch (error) {
            set({ error: error.response?.data?.message || "Error categoryAdd", isLoading: false });
            throw error;
        }
    }

}))