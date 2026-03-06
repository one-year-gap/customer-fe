import { axiosInstance } from "@/lib/axios";
import type { PlansData, PlansResponse } from "@/models/plan";

export const getPlans = async (category: string): Promise<PlansData> => {
  const { data } = await axiosInstance.get<PlansResponse>("/api/v1/customer/plans", {
    params: {
      category,
      page: 0,
      size: 50,
    },
  });

  return data.data;
};
