import { axiosInstance } from "@/lib/axios";
import type { ApiResponse, CustomerProfile } from "@/models/customer/customerProfile";

// export async function getCustomerProfile(customerId: number): Promise<CustomerProfile> {
//   const response = await axiosInstance.get<ApiResponse<CustomerProfile>>(
//     `/api/v1/customers/${customerId}/profile`,
//   );

//   return response.data.data;
// }

export async function getCustomerProfile(): Promise<CustomerProfile> {
  const response = await axiosInstance.get<ApiResponse<CustomerProfile>>(`/api/v1/customers/me`);

  return response.data.data;
}
