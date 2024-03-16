import axios from "axios";

export const baseUrl = "http://192.168.196.166:5267";

const instance = axios.create({
  baseURL: "http://192.168.196.166:5267",
  timeout: 60000,
});

instance.interceptors.response.use(
  function (response) {
    if (response.status) return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
