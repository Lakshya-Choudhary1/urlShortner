import {create} from 'zustand'
import axiosInstance from '../utils/axios.js';
import { toast } from 'react-hot-toast';

export const useUrlStore = create((set,get) => ({
    originalUrl: "",
    shortUrl: "",
    setUrl: (newUrl) => set({originalUrl: newUrl}),

    submitUrl: async () => {
        try {
            const response = await axiosInstance.post('/url/create', { originalUrl: get().originalUrl });
            console.log(response.data)
            set({ shortUrl: response.data.newUrl.shortUrl });
            toast.success("URL shortened successfully!");
        } catch (error) {
            console.error("Error submitting URL:", error);
            toast.error("Failed to shorten URL. Please try again.");
        }finally {
            set({ originalUrl: "" });
        }
    }
}))  

