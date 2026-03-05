import { useQuery } from "@tanstack/react-query";

import { getPlanDetail } from "@/services/planDetailService";

export function usePlanDetail(productId: number | null) {
  return useQuery({
    queryKey: ["planDetail", productId],
    queryFn: () => getPlanDetail(productId!),
    enabled: !!productId,
  });
}
