import { api } from "@/lib/axios";
import type {
  ChangePlanApiResponse,
  ChangePlanData,
  ChangePlanRequestDTO,
} from "@/models/planChange";

export async function changePlan(body: ChangePlanRequestDTO): Promise<ChangePlanData> {
  const res = await api.post<ChangePlanApiResponse>("/api/v1/customer/plans/change", body);

  return res.data.data;
}
