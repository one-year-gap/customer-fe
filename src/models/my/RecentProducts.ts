export interface RecentProductsResponse {
  status: string;
  data: {
    items: RecentProducts[];
  };
  timestamp: string;
}

export interface RecentProducts {
  productId: number;
  productName: string;
  productType: ProductType;
  tags: string[];
  viewedAt: string;
}
export type ProductType = "mobile" | "tablet" | "internet" | "iptv" | "addon";
