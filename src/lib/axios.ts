import axios from "axios";

import { useAuthStore } from "@/stores/useAuthStore";

const NEXT_PUBLIC_API_BASE_URL = "https://api.holliverse.site";

export const api = axios.create({
  baseURL: NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

// 단일 토큰 갱신 Promise (Token Race 방지용 Single-Flight 패턴)
let refreshPromise: Promise<string> | null = null;

const executeRefresh = async (): Promise<string> => {
  if (refreshPromise) return refreshPromise;
  refreshPromise = (async () => {
    try {
      const response = await axios.post(
        `${NEXT_PUBLIC_API_BASE_URL}/v1/auth/refresh`,
        {},
        { withCredentials: true },
      );
      const newAccessToken = response.data.data.accessToken;
<<<<<<< feat/HSC-354

=======
>>>>>>> dev
      if (newAccessToken) {
        useAuthStore.getState().setAccessToken(newAccessToken);
        return newAccessToken;
      }
      throw new Error("받아온 응답에 엑세스 토큰이 비어있습니다.");
    } catch (error) {
      useAuthStore.getState().clearAuth();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      throw error;
    } finally {
      // 3. 작업 완료 후 초기화
      refreshPromise = null;
    }
  })();
  return refreshPromise;
};

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
      const newAccessToken = await executeRefresh();
      if (newAccessToken) token = newAccessToken;
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터: 401 에러(만료) 발생 시 1회 refresh 호출
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await executeRefresh();

        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
