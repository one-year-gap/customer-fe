import { api } from "@/lib/axios";

export const logout = async () => {
  const res = await api.post("/v1/auth/logout");
  return res.data;
};
