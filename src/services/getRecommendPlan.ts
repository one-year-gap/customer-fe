import { api } from "@/lib/axios";
import type { RecommendPlanResponse } from "@/models/recommendPlan";

interface RecommendRequest {
  member_id: number;
  profile_text: string;
}

export async function getRecommendPlan(body: RecommendRequest) {
  const res = await api.get<RecommendPlanResponse>("/api/v1/customer/recommendations", {
    data: body,
  });

  return res.data.data;
}
