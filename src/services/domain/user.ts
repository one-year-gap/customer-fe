import { api } from "@/lib/axios";
import type { SignupRequestDTO, SignupResponseDTO } from "@/models/user";

export const signUp = async (data: SignupRequestDTO): Promise<SignupResponseDTO> => {
  const response = await api.post("/signup", data);
  return response.data;
};
