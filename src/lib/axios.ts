import axios from 'axios'
import { toast } from 'sonner'


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    console.log(error);

    // Show toast based on error status
    if (status === 400) {
      toast.error("Bad Request: Please check your input.");
    } else if (status === 404) {
      toast.error("Not Found: The requested resource does not exist.");
    } else if (status === 500) {
      toast.error("Internal Server Error: Please try again later.");
    } else {
      toast.error("An unexpected error occured.");
    }

    const config = error.config;
    if (!config || config.__isRetryRequest) {
      return Promise.reject(error);
    }

    config.__isRetryRequest = true;

    await new Promise((resolve) => setTimeout(resolve, 5000));
    toast.info("Retrying request...");

    try {
      return await axiosInstance(config);
    } catch (err) {
      return Promise.reject(err);
    }
  }
)

export default axiosInstance
