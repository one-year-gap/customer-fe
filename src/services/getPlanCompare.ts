import axios from "axios";

import type { PlanCompareResponseDTO } from "@/models/planCompare";

export async function getPlanCompare(targetPlanId: number): Promise<PlanCompareResponseDTO> {
  const res = await axios.get("https://api.holliverse.site/api/v1/customer/plans/compare", {
    params: { targetPlanId },
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMyIsImVtYWlsIjoidXNlcjEzXzI1MDVAZ21haWwuY29tIiwicm9sZSI6IkNVU1RPTUVSIiwic3RhdHVzIjoiQUNUSVZFIiwidG9rZW5UeXBlIjoiQUNDRVNTIiwiaWF0IjoxNzcyNTI2MDA1LCJleHAiOjE3NzMxMzA4MDV9.wTzihny7lv3fYMTy3bSRY4AcDTs7QwGPP4IN3BvMBfE",
    },
  });

  return res.data.data;
}
