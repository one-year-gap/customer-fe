import api from "axios";

export async function getPlanDetail(productId: number) {
  const { data } = await api.get(`https://api.holliverse.site/api/v1/customer/plans/${productId}`);

  return data.data;
}
