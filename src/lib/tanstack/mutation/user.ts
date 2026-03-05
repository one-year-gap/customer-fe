import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import type {
  GoogleSignupRequestDTO,
  LoginRequestDTO,
  LoginResponseDTO,
  SignupRequestDTO,
  SignupResponseDTO,
} from "@/models/user";
import { logIn, onboardingComplete, signUp } from "@/services/domain/user";

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
