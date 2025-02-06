import {create} from 'zustand'
import axios from 'axios'

export const useProductStore = create((set) => ({

    data: null,
    error:null,
    isLoading: false,
    message: null,

    productAdd: async () => {
        set({isLoading: true, error: null})
        try {
            
        } catch (error) {
            
        }
    }

}))