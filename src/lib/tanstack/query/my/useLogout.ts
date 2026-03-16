import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout } from "@/services/domain/my/logout";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
