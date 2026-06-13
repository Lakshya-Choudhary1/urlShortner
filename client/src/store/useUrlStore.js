import {create} from 'zustand'
import axiosInstance from '../utils/axios.js';
import { toast } from 'react-hot-toast';
 const useUrlStore = create((set,get) => ({
    originalUrl: "",
    shortUrl: "",
    allUrl:[],
    setUrl: (newUrl) => set({originalUrl: newUrl}),
    setAllUrl: (updatedUrl) => set({allUrl:updatedUrl}),

    deleteUrl: async (urlId) => {
        try {
            await axiosInstance.delete(`/url/delete/${urlId}`);
            set((state) => ({
                allUrl: state.allUrl.filter((url) => url._id !== urlId),
            }));
            toast.success("URL deleted successfully!");
        } catch (error) {
            console.error("Error deleting URL:", error);
            toast.error("Failed to delete URL. Please try again.");
        }
    },
    submitUrl: async (customUrl,id) => {
        try {
            const response = await axiosInstance.post('/url/create',
              {
                originalUrl: get().originalUrl,
                uniqueShortUrl: customUrl ? customUrl : null,
                userId : id ? id : null
            });
            set({ shortUrl: response.data.newUrl.shortUrl });
            toast.success("URL shortened successfully!");
        } catch (error) {
            console.error("Error submitting URL:", error);
            toast.error("Failed to shorten URL. Please try again.");
        }finally {
            set({ originalUrl: "" });
        }
    }
    ,
    getAllUrl: async() =>{
        try {
            const response = await axiosInstance.get('/url/all');
            set({ allUrl: response.data.urls });
        } catch (error) {
            console.error("Error submitting URL:", error);
        }
    },
    toggleUrlStatus: async(urlId) =>{
        try {
            await axiosInstance.get(`/url/toggleUrlStatus/${urlId}`);
        } catch (error) {
            console.error("Error submitting URL:", error);
        }
    }
}))  

export default useUrlStore;