
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}`,
  timeout: 500000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const session = JSON.parse(Cookies.get('user') as string);

    if (session.state.user !== null) {
      config.headers.Authorization = `Bearer ${session.state.user.token}`
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {

    return response;
  },
  (error) => {
    console.log(error, 'ERR')
    if (error.response.status === 401) {
      console.log(error)
    }
    return Promise.reject(error);
  }
);

export default axiosInstance
