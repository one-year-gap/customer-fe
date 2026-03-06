import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseURL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_DEV_ACCESS_TOKEN;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
