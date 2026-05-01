import axios from 'axios';

const baseURL = import.meta.env.MODE === 'development' ? 'http://localhost:3000/api/v1' : '/api/v1'; // Base URL for your API

const axiosInstance = axios.create({
    baseURL, // Base URL for your API
     withCredentials: true, // Include cookies in requests
});

export default axiosInstance;