import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import type { SignupRequestDTO, SignupResponseDTO } from "@/models/user";
import { signUp } from "@/services/domain/user";

export const useSignup = (
  options?: UseMutationOptions<SignupResponseDTO, Error, SignupRequestDTO>,
) => {
  return useMutation({
    mutationFn: signUp,
    ...options,
  });
};
