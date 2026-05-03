import axios from 'axios';
import { BASEURL } from '@/config/config.js';

const baseURL = `${BASEURL}/api/v1`

const axiosInstance = axios.create({
    baseURL, // Base URL for your API
    withCredentials: true, // Include cookies in requests
});

export default axiosInstance;