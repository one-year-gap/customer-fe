import { useQuery } from "@tanstack/react-query";

import { getPlanCompare } from "@/services/getPlanCompare";

export const usePlanCompare = (targetPlanId: number | null, open: boolean) => {
  return useQuery({
    queryKey: ["planCompare", targetPlanId],
    queryFn: () => getPlanCompare(targetPlanId as number),
    enabled: open && !!targetPlanId,
  });
};
