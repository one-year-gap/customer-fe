import api from "axios";

import type { PlanCompareResponseDTO } from "@/models/planCompare";

export async function getPlanCompare(targetPlanId: number): Promise<PlanCompareResponseDTO> {
  const res = await api.get("https://api.holliverse.site/api/v1/customer/plans/compare", {
    params: { targetPlanId },
  });

  return res.data.data;
}
