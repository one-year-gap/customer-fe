export type ProductType = "MOBILE_PLAN" | "TAB_WATCH_PLAN" | "INTERNET" | "IPTV" | "ADDON";

export interface MobilePlanContent {
  dataAmount: string;
  tetheringSharingData: number | null;
  benefitVoiceCall: string;
  benefitSms: string;
  benefitBrands: string | null;
  benefitMedia: string | null;
  benefitPremium: string | null;
  benefitSignatureFamilyDiscount: string | null;
}

export interface TabWatchPlanContent {
  dataAmount: string;
  benefitVoiceCall: string | null;
  benefitSms: string | null;
}

export interface InternetPlanContent {
  planTitle: string;
  speed: string;
  benefits: string;
}

export interface IptvPlanContent {
  planTitle: string;
  channelCount: number;
  benefits: string;
}

export interface AddonContent {
  addonType: string;
  description: string;
}

export type PlanContent =
  | MobilePlanContent
  | TabWatchPlanContent
  | InternetPlanContent
  | IptvPlanContent
  | AddonContent;

export interface Plan {
  productId: number;
  name: string;
  productType: ProductType;
  price: number;
  salePrice: number;
  discountType: string | null;
  productCode: string;
  content: PlanContent;
  isBest: boolean;
  tags: string[];
}

export interface PlansData {
  page: {
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
  };
  content: Plan[];
}

export interface PlansResponse {
  status: string;
  data: PlansData;
  timestamp: string;
}
