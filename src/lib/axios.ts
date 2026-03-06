import axios from "axios";

import { useAuthStore } from "@/stores/useAuthStore";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

// accessToken 헤더에 삽입
api.interceptors.request.use(async (config) => {
  let token = useAuthStore.getState().accessToken;

  const isAuthOrRefresh =
    config.url?.includes("/auth/login") ||
    config.url?.includes("/signup") ||
    config.url?.includes("/auth/refresh");

  // 토큰이 없고, 로그인이/회원가입/리프레시 요청이 아닐 때 미리 refresh 시도
  if (!token && !isAuthOrRefresh) {
    try {
      const refreshResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/refresh`,
        {},
        { withCredentials: true },
      );
      const newAccessToken = refreshResponse.data?.accessToken;

      if (newAccessToken) {
        useAuthStore.getState().setAccessToken(newAccessToken);
        token = newAccessToken;
      }
    } catch (refreshError) {
      useAuthStore.getState().clearAuth();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return Promise.reject(refreshError);
    }
  }

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터: 401 에러(만료) 발생 시 refresh 호출 및 1회 재시도
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 인터셉터 무한 루프 방지를 위해 api 인스턴스 대신 axios 사용
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/refresh`,
          {},
          { withCredentials: true },
        );
        const newAccessToken = refreshResponse.data?.accessToken;

        if (newAccessToken) {
          useAuthStore.getState().setAccessToken(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // 리프레시 토큰도 만료된 경우 상태 초기화 후 로그인 유도
        useAuthStore.getState().clearAuth();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
