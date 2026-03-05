import { useMutation } from "@tanstack/react-query";

import { changePlan } from "@/services/changePlan";

export function useChangePlan() {
  return useMutation({
    mutationFn: changePlan,
  });
}
