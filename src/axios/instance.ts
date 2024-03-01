import axios from "axios";
import Cookies from "js-cookie";
import { formatToken } from "../helpers";

const axiosInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
  // timeout: 10000,
});

axiosInstance
  .interceptors
  .request
  .use(function (config) {
    if (!config.headers['Authorization']) {
      const token = Cookies.get('accessToken')
      console.log(token)
      if (token) {
        config.headers['Authorization'] = formatToken(token);
      }
    }
    return config;
  }, function (error) {
    console.log(1)
    return Promise.reject(error);
  });

export { axiosInstance }
