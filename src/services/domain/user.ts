import { api } from "@/lib/axios";
import type {
  ApiResponse,
  GoogleSignupRequestDTO,
  LoginRequestDTO,
  LoginResponseDTO,
  OnboardingMeResponseDTO,
  SignupRequestDTO,
  SignupResponseDTO,
} from "@/models/user";

export const signUp = async (data: SignupRequestDTO): Promise<ApiResponse<SignupResponseDTO>> => {
  const response = await api.post("/api/v1/signup", data);
  return response.data;
};

export const logIn = async (data: LoginRequestDTO): Promise<ApiResponse<LoginResponseDTO>> => {
  const response = await api.post("/v1/auth/login", data);
  return response.data;
};
export const getOnboardingMe = async (): Promise<OnboardingMeResponseDTO> => {
  const response = await api.get("/v1/auth/onboarding/me");
  return response.data;
};

export const onboardingComplete = async (
  data: GoogleSignupRequestDTO,
): Promise<ApiResponse<null>> => {
  const response = await api.post("/v1/auth/onboarding/complete", data);
  return response.data;
};

export const refreshAccessToken = async (): Promise<ApiResponse<LoginResponseDTO>> => {
  const response = await api.post("/v1/auth/refresh");
  return response.data;
};
