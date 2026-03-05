import axios from "axios";

import { useAuthStore } from "@/stores/useAuthStore";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

// accessToken 헤더에 삽입
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
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
      originalRequest._retry = true; // 1회 재시도 플래그

      try {
        // 인터셉터 무한 루프 방지를 위해 api 인스턴스 대신 axios 사용
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/refresh`,
          {},
          { withCredentials: true },
        );
        const newAccessToken = refreshResponse.data?.accessToken;

        if (newAccessToken) {
          // 원본 요청 1회 재시도
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
