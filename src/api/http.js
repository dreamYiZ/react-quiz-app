import axios from "axios";
import { PATH_BASE_URL } from "./path";

const instance = axios.create({
  baseURL: PATH_BASE_URL,
  timeout: 1000,
});

instance.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log('response.status', response)
    if(response && response.status === 200){
      if (response.data && response.data && response.data){
        // console.log('token', response.data.token);
        if(response.data.token){
          sessionStorage.setItem('token', response.data.token);
        }
      }
    }
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default instance;
