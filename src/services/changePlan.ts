import { api } from "@/lib/axios";
import type {
  ChangePlanApiResponse,
  ChangePlanData,
  ChangePlanRequestDTO,
} from "@/models/planChange";

export async function changePlan(body: ChangePlanRequestDTO): Promise<ChangePlanData> {
  const res = await api.post<ChangePlanApiResponse>("/api/v1/customer/plans/change", body, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMCIsImVtYWlsIjoidXNlcjEwXzEwNTJAZ21haWwuY29tIiwicm9sZSI6IkNVU1RPTUVSIiwic3RhdHVzIjoiQUNUSVZFIiwidG9rZW5UeXBlIjoiQUNDRVNTIiwiaWF0IjoxNzcyNjc2MTMzLCJleHAiOjE3NzMyODA5MzN9.OEyOMAm229WvS6gHAdq_ixlGdtxOv7OvflOoVKi4VA0",
    },
  });

  return res.data.data;
}
