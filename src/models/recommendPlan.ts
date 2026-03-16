export interface RecommendedProduct {
  rank: number;
  productId: number;
  productName: string;
  productType: string;
  productPrice: number;
  salePrice: number;
  tags: string[];
  reason: string;
}

export interface RecommendPlanData {
  segment: string;
  cachedLlmRecommendation: string;
  recommendedProducts: RecommendedProduct[];
  source: string;
  updatedAt: string;
}

export interface RecommendPlanResponse {
  status: string;
  data: RecommendPlanData;
  timestamp: string;
}
