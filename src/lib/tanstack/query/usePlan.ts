import { useQuery } from "@tanstack/react-query";

import type { PlansData } from "@/models/plan";
import { getPlans } from "@/services/planService";

export const usePlans = (category: string) => {
  return useQuery<PlansData>({
    queryKey: ["plans", category],
    queryFn: () => getPlans(category),
  });
};
