export interface ChangePlanRequestDTO {
  targetProductId: number;
}

export interface ChangePlanData {
  subscription_id: number;
  product_id: number;
  product_name: string;
  sale_price: number;
  start_date: string;
}

export interface ChangePlanApiResponse {
  status: string;
  data: ChangePlanData;
  timestamp: string;
}
