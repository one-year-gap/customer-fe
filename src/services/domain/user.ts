import { api } from "@/lib/axios";
import type {
  LoginRequestDTO,
  LoginResponseDTO,
  SignupRequestDTO,
  SignupResponseDTO,
} from "@/models/user";

export const signUp = async (data: SignupRequestDTO): Promise<SignupResponseDTO> => {
  const response = await api.post("/signup", data);
  return response.data;
};

export const logIn = async (data: LoginRequestDTO): Promise<LoginResponseDTO> => {
  const response = await api.post("auth/login", data);
  return response.data;
};
