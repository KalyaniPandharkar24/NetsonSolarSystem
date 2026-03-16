import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api";

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("adminToken");
    }
    return Promise.reject(error);
  }
);

export default api;
