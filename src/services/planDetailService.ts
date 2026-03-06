import axios from "axios";

export async function getPlanDetail(productId: number) {
  const { data } = await axios.get(
    `https://api.holliverse.site/api/v1/customer/plans/${productId}`,
  );

  return data.data;
}
