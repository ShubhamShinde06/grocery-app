import {create} from 'zustand'
import axios from 'axios'

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticted: null,
    error:null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,



    signup: async (email, password, name, shopName, phoneNumber, street, state, city, zipcode) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post("/api/auth/shopkeeper/signup", {
                email, password, name, shopName, phoneNumber, street, state, city, zipcode
            });
            set({ user: response.data.shopkeeper, isAuthenticted: true, isLoading: false});
        } catch (error) {
            set({ error: error.response?.data?.message || "Error signing up", isLoading: false });
            throw error;
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post("/api/auth/shopkeeper/login", {email, password});
            set({ user: response.data.shopkeeper, isAuthenticted: true, isLoading: false, error:null});
        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
            throw error;
        }
    },
    logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await axios.post(`/api/auth/shopkeeper/logout`);
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}
	},

    verifyEmail: async (code) => {
        set({isLoading: true, error: null})
        try {
            const response = await axios.post('/api/auth/shopkeeper/verify-email', {code})
            set({user: response.data.shopkeeper, isAuthenticted: true, isLoading: false})
            return response.data
        } catch (error) {
            set({error: error.response.data.message || "Error verify email", isLoading: false})
            throw error
        }
    },

    checkAuth: async () => {
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axios.get(`/api/auth/shopkeeper/check-auth`,  { withCredentials: true });
			set({ user: response.data.shopkeeper, isAuthenticated: true, isCheckingAuth: false });
		} catch (error) {
			set({ error: null, isCheckingAuth: false, isAuthenticated: false });
            throw error
		}
	},

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null, message: null })
        try {
            const response = await axios.post('/api/auth/shopkeeper/forgot-password', {email})
            set({message: response.data.message, isLoading: false})
        } catch (error) {
            set({isLoading: false, error: error.response.data.message || "Error sending reset password"})
            throw error
        }
    },

    resetPassword: async (token, password) => {
        set({isLoading: true, error: null})
        try {
            const response = await axios.post(`/api/auth/shopkeeper/reset-password/${token}`, {password})
            set({message: response.data.message, isLoading: false})
        } catch (error) {
            set({isLoading: false, error: error.response.data.message || "Error resetting password"})
            throw error
        }
    }
}))