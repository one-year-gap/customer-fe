import { axiosInstance } from "@/lib/axios";
import type { ApiResponse, CustomerProfile } from "@/models/customer/customerProfile";

export async function getCustomerProfile(): Promise<CustomerProfile> {
  const response = await axiosInstance.get<ApiResponse<CustomerProfile>>(`/api/v1/customer/me`);

  return response.data.data;
}
