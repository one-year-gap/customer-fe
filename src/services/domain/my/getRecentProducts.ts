import { api } from "@/lib/axios";
import type { RecentProductsResponse } from "@/models/my/RecentProducts";

export const getRecentProducts = async (limit: number = 3): Promise<RecentProductsResponse> => {
  const safeLimit = Number.isInteger(limit) && limit > 0 ? limit : 3;
  const res = await api.get(`/api/v1/customer/recent-activities?limit=${safeLimit}`);
  return res.data;
};
