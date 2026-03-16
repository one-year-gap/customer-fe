import { api } from "@/lib/axios";

export async function getPlanDetail(productId: number) {
  const { data } = await api.get(`/api/v1/customer/plans/${productId}`);

  return data.data;
}
