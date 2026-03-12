import { api } from "@/lib/axios";
import type { RecentProductsResponse } from "@/models/my/RecentProducts";

export const getRecentProducts = async (limit: number = 3): Promise<RecentProductsResponse> => {
  const res = await api.get(`/api/v1/customer/recent-activities?limit=${limit}`);
  return res.data;
};
