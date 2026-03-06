import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import type {
  GoogleSignupRequestDTO,
  LoginRequestDTO,
  LoginResponseDTO,
  SignupRequestDTO,
  SignupResponseDTO,
} from "@/models/user";
import { logIn, onboardingComplete, refreshAccessToken, signUp } from "@/services/domain/user";
import { useAuthStore } from "@/stores/useAuthStore";

export const useSignup = (
  options?: UseMutationOptions<SignupResponseDTO, Error, SignupRequestDTO>,
) => {
  return useMutation({
    mutationFn: signUp,
    ...options,
  });
};

export const useLogin = (
  options?: UseMutationOptions<LoginResponseDTO, Error, LoginRequestDTO>,
) => {
  return useMutation({
    mutationFn: logIn,
    ...options,
  });
};

export const useGoogleSignup = (
  options?: UseMutationOptions<SignupResponseDTO, Error, GoogleSignupRequestDTO>,
) => {
  return useMutation({
    mutationFn: onboardingComplete,
    ...options,
  });
};

export const useRefresh = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: refreshAccessToken,
    onSuccess: (res) => {
      const newToken = res.data.accessToken;
      if (newToken) {
        setAccessToken(newToken);
        console.log("토큰 갱신 완료");
      }
    },
    onError: (error) => {
      console.error("토큰 갱신 실패:", error);
      clearAuth();
    },
  });
};
