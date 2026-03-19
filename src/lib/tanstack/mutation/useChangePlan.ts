import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/tanstack/query/common/keys";
import { changePlan } from "@/services/changePlan";

export function useChangePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changePlan,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.customerProfile,
      });
    },
  });
}
