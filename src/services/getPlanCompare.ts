import axios from "axios";

import type { PlanCompareResponseDTO } from "@/models/planCompare";

export async function getPlanCompare(targetPlanId: number): Promise<PlanCompareResponseDTO> {
  const res = await axios.get("https://api.holliverse.site/api/v1/customer/plans/compare", {
    params: { targetPlanId },
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMCIsImVtYWlsIjoidXNlcjEwXzEwNTJAZ21haWwuY29tIiwicm9sZSI6IkNVU1RPTUVSIiwic3RhdHVzIjoiQUNUSVZFIiwidG9rZW5UeXBlIjoiQUNDRVNTIiwiaWF0IjoxNzcyNjc2MTMzLCJleHAiOjE3NzMyODA5MzN9.OEyOMAm229WvS6gHAdq_ixlGdtxOv7OvflOoVKi4VA0",
    },
  });

  return res.data.data;
}
