import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const api_measurement = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api_measurement.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default api_measurement;
