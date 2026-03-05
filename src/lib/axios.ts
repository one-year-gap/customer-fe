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
